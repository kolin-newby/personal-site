// Vendored from @keystone-6/document-renderer (MIT) rather than installed as a
// dependency, since its React peer range (16-18) conflicts with this project's React 19.
// Trimmed to the default renderers - no overrides or component blocks.
import { cloneElement, Fragment, type JSX, type ReactElement, type ReactNode } from "react";

export type Node = Element | Text;

export type Element = {
  children: Node[];
  [key: string]: unknown;
};

export type Text = {
  text: string;
  [key: string]: unknown;
};

type Mark =
  | "bold"
  | "italic"
  | "underline"
  | "strikethrough"
  | "code"
  | "superscript"
  | "subscript"
  | "keyboard";

type Component<Props> = (props: Props) => ReactNode;

type TextAlign = "center" | "end" | undefined;
type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type RelationshipData = {
  id: string;
  label: string | undefined;
  data: Record<string, unknown> | undefined;
};

type OnlyChildrenComponent =
  | Component<{ children: ReactNode }>
  | keyof JSX.IntrinsicElements;

type MarkRenderers = { [Key in Mark]: OnlyChildrenComponent };

interface Renderers {
  inline: {
    link: Component<{ children: ReactNode; href: string }> | "a";
    relationship: Component<{
      relationship: string;
      data: RelationshipData | null;
    }>;
  } & MarkRenderers;
  block: {
    paragraph: Component<{
      children: ReactNode;
      textAlign: "center" | "end" | undefined;
    }>;
    blockquote: OnlyChildrenComponent;
    code: Component<{ children: string }> | keyof JSX.IntrinsicElements;
    layout: Component<{ layout: [number, ...number[]]; children: ReactNode[] }>;
    divider: Component<unknown> | keyof JSX.IntrinsicElements;
    heading: Component<{
      level: 1 | 2 | 3 | 4 | 5 | 6;
      children: ReactNode;
      textAlign: "center" | "end" | undefined;
    }>;
    list: Component<{ type: "ordered" | "unordered"; children: ReactNode[] }>;
  };
}

const renderers: Renderers = {
  inline: {
    bold: "strong",
    code: "code",
    keyboard: "kbd",
    strikethrough: "s",
    italic: "em",
    link: "a",
    subscript: "sub",
    superscript: "sup",
    underline: "u",
    relationship: ({ data }) => {
      return <span>{data?.label || data?.id}</span>;
    },
  },
  block: {
    blockquote: "blockquote",
    // mb/last:mb-0 restores paragraph spacing stripped by Tailwind's preflight;
    // min-h keeps empty paragraphs (blank lines in the editor) from collapsing;
    // pre-line keeps soft breaks (shift+enter, stored as "\n") visible.
    paragraph: ({ children, textAlign }) => {
      return (
        <p
          className="mb-[0.75em] min-h-lh whitespace-pre-line last:mb-0"
          style={{ textAlign }}
        >
          {children}
        </p>
      );
    },
    divider: "hr",
    heading: ({ level, children, textAlign }) => {
      const Heading = `h${level}` as "h1";
      return <Heading style={{ textAlign }} children={children} />;
    },
    code: "pre",
    list: ({ children, type }) => {
      const List = type === "ordered" ? "ol" : "ul";
      return (
        <List>
          {children.map((x, i) => (
            <li key={i}>{x}</li>
          ))}
        </List>
      );
    },
    layout: ({ children, layout }) => {
      return (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: layout.map((x) => `${x}fr`).join(" "),
          }}
        >
          {children.map((element, i) => (
            <div key={i}>{element}</div>
          ))}
        </div>
      );
    },
  },
};

function DocumentNode({ node: _node }: { node: Element | Text }): ReactElement {
  if (typeof _node.text === "string") {
    let child = <Fragment>{_node.text}</Fragment>;
    (Object.keys(renderers.inline) as (keyof typeof renderers.inline)[]).forEach(
      (markName) => {
        if (markName !== "link" && markName !== "relationship" && _node[markName]) {
          const Mark = renderers.inline[markName];
          child = <Mark>{child}</Mark>;
        }
      },
    );

    return child;
  }
  const node = _node as Element;
  const children = node.children.map((x, i) =>
    cloneElement(DocumentNode({ node: x }), { key: i }),
  );
  switch (node.type as string) {
    case "blockquote": {
      return <renderers.block.blockquote children={children} />;
    }
    case "paragraph": {
      return <renderers.block.paragraph textAlign={node.textAlign as TextAlign} children={children} />;
    }
    case "code": {
      if (
        node.children.length === 1 &&
        node.children[0] &&
        typeof node.children[0].text === "string"
      ) {
        return <renderers.block.code>{node.children[0].text}</renderers.block.code>;
      }
      break;
    }
    case "layout": {
      return <renderers.block.layout layout={node.layout as [number, ...number[]]} children={children} />;
    }
    case "divider": {
      return <renderers.block.divider />;
    }
    case "heading": {
      return (
        <renderers.block.heading
          textAlign={node.textAlign as TextAlign}
          level={node.level as HeadingLevel}
          children={children}
        />
      );
    }
    case "ordered-list":
    case "unordered-list": {
      return (
        <renderers.block.list
          children={children}
          type={node.type === "ordered-list" ? "ordered" : "unordered"}
        />
      );
    }
    case "relationship": {
      const data = node.data as RelationshipData | null | undefined;
      return (
        <renderers.inline.relationship
          relationship={node.relationship as string}
          data={data ? { id: data.id, label: data.label, data: data.data } : null}
        />
      );
    }
    case "link": {
      return <renderers.inline.link href={node.href as string}>{children}</renderers.inline.link>;
    }
  }
  return <Fragment>{children}</Fragment>;
}

// Renders each top-level document node to a React element array, so callers can
// splice the result directly into another element's children (e.g. for text-scanning
// wrappers that need to see the actual text nodes, not a nested component).
export function renderDocumentNodes(document: Element[]): ReactElement[] {
  return document.map((x, i) => cloneElement(DocumentNode({ node: x }), { key: i }));
}
