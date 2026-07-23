/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: unknown; output: unknown; }
  JSON: { input: unknown; output: unknown; }
  Upload: { input: unknown; output: unknown; }
};

export type AuthenticatedItem = User;

export type Bio = {
  __typename?: 'Bio';
  content?: Maybe<Bio_Content_Document>;
  id: Scalars['ID']['output'];
  textToHighlight?: Maybe<Array<Keyword>>;
  textToHighlightCount?: Maybe<Scalars['Int']['output']>;
};


export type BioTextToHighlightArgs = {
  cursor?: InputMaybe<KeywordWhereUniqueInput>;
  orderBy?: Array<KeywordOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: KeywordWhereInput;
};


export type BioTextToHighlightCountArgs = {
  where?: KeywordWhereInput;
};

export type BioCreateInput = {
  content?: InputMaybe<Scalars['JSON']['input']>;
  textToHighlight?: InputMaybe<KeywordRelateToManyForCreateInput>;
};

export type BioOrderByInput = {
  id?: InputMaybe<OrderDirection>;
};

export type BioUpdateArgs = {
  data: BioUpdateInput;
  where?: BioWhereUniqueInput;
};

export type BioUpdateInput = {
  content?: InputMaybe<Scalars['JSON']['input']>;
  textToHighlight?: InputMaybe<KeywordRelateToManyForUpdateInput>;
};

export type BioWhereInput = {
  AND?: InputMaybe<Array<BioWhereInput>>;
  NOT?: InputMaybe<Array<BioWhereInput>>;
  OR?: InputMaybe<Array<BioWhereInput>>;
  id?: InputMaybe<IdFilter>;
  textToHighlight?: InputMaybe<KeywordManyRelationFilter>;
};

export type BioWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Bio_Content_Document = {
  __typename?: 'Bio_content_Document';
  document: Scalars['JSON']['output'];
};


export type Bio_Content_DocumentDocumentArgs = {
  hydrateRelationships?: Scalars['Boolean']['input'];
};

export type BooleanFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<BooleanFilter>;
};

export type CreateInitialUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  userName?: InputMaybe<Scalars['String']['input']>;
};

export type CustomFile = {
  __typename?: 'CustomFile';
  altText?: Maybe<Scalars['String']['output']>;
  file?: Maybe<FileFieldOutput>;
  id: Scalars['ID']['output'];
  title?: Maybe<Scalars['String']['output']>;
};

export type CustomFileCreateInput = {
  altText?: InputMaybe<Scalars['String']['input']>;
  file?: InputMaybe<FileFieldInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CustomFileOrderByInput = {
  altText?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
};

export type CustomFileRelateToOneForCreateInput = {
  connect?: InputMaybe<CustomFileWhereUniqueInput>;
  create?: InputMaybe<CustomFileCreateInput>;
};

export type CustomFileRelateToOneForUpdateInput = {
  connect?: InputMaybe<CustomFileWhereUniqueInput>;
  create?: InputMaybe<CustomFileCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CustomFileUpdateArgs = {
  data: CustomFileUpdateInput;
  where: CustomFileWhereUniqueInput;
};

export type CustomFileUpdateInput = {
  altText?: InputMaybe<Scalars['String']['input']>;
  file?: InputMaybe<FileFieldInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CustomFileWhereInput = {
  AND?: InputMaybe<Array<CustomFileWhereInput>>;
  NOT?: InputMaybe<Array<CustomFileWhereInput>>;
  OR?: InputMaybe<Array<CustomFileWhereInput>>;
  altText?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  title?: InputMaybe<StringFilter>;
};

export type CustomFileWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CustomImage = {
  __typename?: 'CustomImage';
  altText?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<ImageFieldOutput>;
  title?: Maybe<Scalars['String']['output']>;
};

export type CustomImageCreateInput = {
  altText?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<ImageFieldInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CustomImageManyRelationFilter = {
  every?: InputMaybe<CustomImageWhereInput>;
  none?: InputMaybe<CustomImageWhereInput>;
  some?: InputMaybe<CustomImageWhereInput>;
};

export type CustomImageOrderByInput = {
  altText?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
};

export type CustomImageRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<CustomImageWhereUniqueInput>>;
  create?: InputMaybe<Array<CustomImageCreateInput>>;
};

export type CustomImageRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<CustomImageWhereUniqueInput>>;
  create?: InputMaybe<Array<CustomImageCreateInput>>;
  disconnect?: InputMaybe<Array<CustomImageWhereUniqueInput>>;
  set?: InputMaybe<Array<CustomImageWhereUniqueInput>>;
};

export type CustomImageUpdateArgs = {
  data: CustomImageUpdateInput;
  where: CustomImageWhereUniqueInput;
};

export type CustomImageUpdateInput = {
  altText?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<ImageFieldInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CustomImageWhereInput = {
  AND?: InputMaybe<Array<CustomImageWhereInput>>;
  NOT?: InputMaybe<Array<CustomImageWhereInput>>;
  OR?: InputMaybe<Array<CustomImageWhereInput>>;
  altText?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  title?: InputMaybe<StringFilter>;
};

export type CustomImageWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<DateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type FileFieldInput = {
  upload: Scalars['Upload']['input'];
};

export type FileFieldOutput = {
  __typename?: 'FileFieldOutput';
  filename: Scalars['String']['output'];
  filesize: Scalars['Int']['output'];
  url: Scalars['String']['output'];
};

export type Gallery = {
  __typename?: 'Gallery';
  id: Scalars['ID']['output'];
  photos?: Maybe<Array<CustomImage>>;
  photosCount?: Maybe<Scalars['Int']['output']>;
  tagline?: Maybe<Scalars['String']['output']>;
};


export type GalleryPhotosArgs = {
  cursor?: InputMaybe<CustomImageWhereUniqueInput>;
  orderBy?: Array<CustomImageOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: CustomImageWhereInput;
};


export type GalleryPhotosCountArgs = {
  where?: CustomImageWhereInput;
};

export type GalleryCreateInput = {
  photos?: InputMaybe<CustomImageRelateToManyForCreateInput>;
  tagline?: InputMaybe<Scalars['String']['input']>;
};

export type GalleryOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  tagline?: InputMaybe<OrderDirection>;
};

export type GalleryUpdateArgs = {
  data: GalleryUpdateInput;
  where?: GalleryWhereUniqueInput;
};

export type GalleryUpdateInput = {
  photos?: InputMaybe<CustomImageRelateToManyForUpdateInput>;
  tagline?: InputMaybe<Scalars['String']['input']>;
};

export type GalleryWhereInput = {
  AND?: InputMaybe<Array<GalleryWhereInput>>;
  NOT?: InputMaybe<Array<GalleryWhereInput>>;
  OR?: InputMaybe<Array<GalleryWhereInput>>;
  id?: InputMaybe<IdFilter>;
  photos?: InputMaybe<CustomImageManyRelationFilter>;
  tagline?: InputMaybe<StringFilter>;
};

export type GalleryWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type IdFilter = {
  equals?: InputMaybe<Scalars['ID']['input']>;
  gt?: InputMaybe<Scalars['ID']['input']>;
  gte?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<Scalars['ID']['input']>>;
  lt?: InputMaybe<Scalars['ID']['input']>;
  lte?: InputMaybe<Scalars['ID']['input']>;
  not?: InputMaybe<IdFilter>;
  notIn?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type Icon = {
  __typename?: 'Icon';
  id: Scalars['ID']['output'];
  label?: Maybe<Scalars['String']['output']>;
  svg?: Maybe<CustomFile>;
};

export type IconCreateInput = {
  label?: InputMaybe<Scalars['String']['input']>;
  svg?: InputMaybe<CustomFileRelateToOneForCreateInput>;
};

export type IconDisplay = {
  __typename?: 'IconDisplay';
  icon?: Maybe<Array<Icon>>;
  iconCount?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
};


export type IconDisplayIconArgs = {
  cursor?: InputMaybe<IconWhereUniqueInput>;
  orderBy?: Array<IconOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: IconWhereInput;
};


export type IconDisplayIconCountArgs = {
  where?: IconWhereInput;
};

export type IconDisplayCreateInput = {
  icon?: InputMaybe<IconRelateToManyForCreateInput>;
};

export type IconDisplayOrderByInput = {
  id?: InputMaybe<OrderDirection>;
};

export type IconDisplayUpdateArgs = {
  data: IconDisplayUpdateInput;
  where?: IconDisplayWhereUniqueInput;
};

export type IconDisplayUpdateInput = {
  icon?: InputMaybe<IconRelateToManyForUpdateInput>;
};

export type IconDisplayWhereInput = {
  AND?: InputMaybe<Array<IconDisplayWhereInput>>;
  NOT?: InputMaybe<Array<IconDisplayWhereInput>>;
  OR?: InputMaybe<Array<IconDisplayWhereInput>>;
  icon?: InputMaybe<IconManyRelationFilter>;
  id?: InputMaybe<IdFilter>;
};

export type IconDisplayWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type IconManyRelationFilter = {
  every?: InputMaybe<IconWhereInput>;
  none?: InputMaybe<IconWhereInput>;
  some?: InputMaybe<IconWhereInput>;
};

export type IconOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  label?: InputMaybe<OrderDirection>;
};

export type IconRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<IconWhereUniqueInput>>;
  create?: InputMaybe<Array<IconCreateInput>>;
};

export type IconRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<IconWhereUniqueInput>>;
  create?: InputMaybe<Array<IconCreateInput>>;
  disconnect?: InputMaybe<Array<IconWhereUniqueInput>>;
  set?: InputMaybe<Array<IconWhereUniqueInput>>;
};

export type IconRelateToOneForCreateInput = {
  connect?: InputMaybe<IconWhereUniqueInput>;
  create?: InputMaybe<IconCreateInput>;
};

export type IconRelateToOneForUpdateInput = {
  connect?: InputMaybe<IconWhereUniqueInput>;
  create?: InputMaybe<IconCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type IconUpdateArgs = {
  data: IconUpdateInput;
  where: IconWhereUniqueInput;
};

export type IconUpdateInput = {
  label?: InputMaybe<Scalars['String']['input']>;
  svg?: InputMaybe<CustomFileRelateToOneForUpdateInput>;
};

export type IconWhereInput = {
  AND?: InputMaybe<Array<IconWhereInput>>;
  NOT?: InputMaybe<Array<IconWhereInput>>;
  OR?: InputMaybe<Array<IconWhereInput>>;
  id?: InputMaybe<IdFilter>;
  label?: InputMaybe<StringFilter>;
  svg?: InputMaybe<CustomFileWhereInput>;
};

export type IconWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
};

export enum ImageExtension {
  Gif = 'gif',
  Jpg = 'jpg',
  Png = 'png',
  Webp = 'webp'
}

export type ImageFieldInput = {
  upload: Scalars['Upload']['input'];
};

export type ImageFieldOutput = {
  __typename?: 'ImageFieldOutput';
  extension: ImageExtension;
  filesize: Scalars['Int']['output'];
  height: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  url: Scalars['String']['output'];
  width: Scalars['Int']['output'];
};

export type Introduction = {
  __typename?: 'Introduction';
  heading?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  typingTerms?: Maybe<Array<Keyword>>;
  typingTermsCount?: Maybe<Scalars['Int']['output']>;
};


export type IntroductionTypingTermsArgs = {
  cursor?: InputMaybe<KeywordWhereUniqueInput>;
  orderBy?: Array<KeywordOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: KeywordWhereInput;
};


export type IntroductionTypingTermsCountArgs = {
  where?: KeywordWhereInput;
};

export type IntroductionCreateInput = {
  heading?: InputMaybe<Scalars['String']['input']>;
  typingTerms?: InputMaybe<KeywordRelateToManyForCreateInput>;
};

export type IntroductionOrderByInput = {
  heading?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
};

export type IntroductionUpdateArgs = {
  data: IntroductionUpdateInput;
  where?: IntroductionWhereUniqueInput;
};

export type IntroductionUpdateInput = {
  heading?: InputMaybe<Scalars['String']['input']>;
  typingTerms?: InputMaybe<KeywordRelateToManyForUpdateInput>;
};

export type IntroductionWhereInput = {
  AND?: InputMaybe<Array<IntroductionWhereInput>>;
  NOT?: InputMaybe<Array<IntroductionWhereInput>>;
  OR?: InputMaybe<Array<IntroductionWhereInput>>;
  heading?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  typingTerms?: InputMaybe<KeywordManyRelationFilter>;
};

export type IntroductionWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type KeystoneAdminMeta = {
  __typename?: 'KeystoneAdminMeta';
  list?: Maybe<KeystoneAdminUiListMeta>;
  lists: Array<KeystoneAdminUiListMeta>;
};


export type KeystoneAdminMetaListArgs = {
  key: Scalars['String']['input'];
};

export type KeystoneAdminUiFieldGroupMeta = {
  __typename?: 'KeystoneAdminUIFieldGroupMeta';
  description?: Maybe<Scalars['String']['output']>;
  fields: Array<KeystoneAdminUiFieldMeta>;
  label: Scalars['String']['output'];
};

export type KeystoneAdminUiFieldMeta = {
  __typename?: 'KeystoneAdminUIFieldMeta';
  createView: KeystoneAdminUiFieldMetaCreateView;
  customViewsIndex?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  fieldMeta?: Maybe<Scalars['JSON']['output']>;
  isFilterable: Scalars['Boolean']['output'];
  isNonNull?: Maybe<Array<KeystoneAdminUiFieldMetaIsNonNull>>;
  isOrderable: Scalars['Boolean']['output'];
  itemView?: Maybe<KeystoneAdminUiFieldMetaItemView>;
  label: Scalars['String']['output'];
  listView: KeystoneAdminUiFieldMetaListView;
  path: Scalars['String']['output'];
  search?: Maybe<QueryMode>;
  viewsIndex: Scalars['Int']['output'];
};


export type KeystoneAdminUiFieldMetaItemViewArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type KeystoneAdminUiFieldMetaCreateView = {
  __typename?: 'KeystoneAdminUIFieldMetaCreateView';
  fieldMode: KeystoneAdminUiFieldMetaCreateViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaCreateViewFieldMode {
  Edit = 'edit',
  Hidden = 'hidden'
}

export enum KeystoneAdminUiFieldMetaIsNonNull {
  Create = 'create',
  Read = 'read',
  Update = 'update'
}

export type KeystoneAdminUiFieldMetaItemView = {
  __typename?: 'KeystoneAdminUIFieldMetaItemView';
  fieldMode?: Maybe<KeystoneAdminUiFieldMetaItemViewFieldMode>;
  fieldPosition?: Maybe<KeystoneAdminUiFieldMetaItemViewFieldPosition>;
};

export enum KeystoneAdminUiFieldMetaItemViewFieldMode {
  Edit = 'edit',
  Hidden = 'hidden',
  Read = 'read'
}

export enum KeystoneAdminUiFieldMetaItemViewFieldPosition {
  Form = 'form',
  Sidebar = 'sidebar'
}

export type KeystoneAdminUiFieldMetaListView = {
  __typename?: 'KeystoneAdminUIFieldMetaListView';
  fieldMode: KeystoneAdminUiFieldMetaListViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaListViewFieldMode {
  Hidden = 'hidden',
  Read = 'read'
}

export type KeystoneAdminUiGraphQl = {
  __typename?: 'KeystoneAdminUIGraphQL';
  names: KeystoneAdminUiGraphQlNames;
};

export type KeystoneAdminUiGraphQlNames = {
  __typename?: 'KeystoneAdminUIGraphQLNames';
  createInputName: Scalars['String']['output'];
  createManyMutationName: Scalars['String']['output'];
  createMutationName: Scalars['String']['output'];
  deleteManyMutationName: Scalars['String']['output'];
  deleteMutationName: Scalars['String']['output'];
  itemQueryName: Scalars['String']['output'];
  listOrderName: Scalars['String']['output'];
  listQueryCountName: Scalars['String']['output'];
  listQueryName: Scalars['String']['output'];
  outputTypeName: Scalars['String']['output'];
  relateToManyForCreateInputName: Scalars['String']['output'];
  relateToManyForUpdateInputName: Scalars['String']['output'];
  relateToOneForCreateInputName: Scalars['String']['output'];
  relateToOneForUpdateInputName: Scalars['String']['output'];
  updateInputName: Scalars['String']['output'];
  updateManyInputName: Scalars['String']['output'];
  updateManyMutationName: Scalars['String']['output'];
  updateMutationName: Scalars['String']['output'];
  whereInputName: Scalars['String']['output'];
  whereUniqueInputName: Scalars['String']['output'];
};

export type KeystoneAdminUiListMeta = {
  __typename?: 'KeystoneAdminUIListMeta';
  description?: Maybe<Scalars['String']['output']>;
  fields: Array<KeystoneAdminUiFieldMeta>;
  graphql: KeystoneAdminUiGraphQl;
  groups: Array<KeystoneAdminUiFieldGroupMeta>;
  hideCreate: Scalars['Boolean']['output'];
  hideDelete: Scalars['Boolean']['output'];
  initialColumns: Array<Scalars['String']['output']>;
  initialSearchFields: Array<Scalars['String']['output']>;
  initialSort?: Maybe<KeystoneAdminUiSort>;
  isHidden: Scalars['Boolean']['output'];
  isSingleton: Scalars['Boolean']['output'];
  itemQueryName: Scalars['String']['output'];
  key: Scalars['String']['output'];
  label: Scalars['String']['output'];
  labelField: Scalars['String']['output'];
  listQueryName: Scalars['String']['output'];
  pageSize: Scalars['Int']['output'];
  path: Scalars['String']['output'];
  plural: Scalars['String']['output'];
  singular: Scalars['String']['output'];
};

export type KeystoneAdminUiSort = {
  __typename?: 'KeystoneAdminUISort';
  direction: KeystoneAdminUiSortDirection;
  field: Scalars['String']['output'];
};

export enum KeystoneAdminUiSortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type KeystoneMeta = {
  __typename?: 'KeystoneMeta';
  adminMeta: KeystoneAdminMeta;
};

export type Keyword = {
  __typename?: 'Keyword';
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type KeywordCreateInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type KeywordManyRelationFilter = {
  every?: InputMaybe<KeywordWhereInput>;
  none?: InputMaybe<KeywordWhereInput>;
  some?: InputMaybe<KeywordWhereInput>;
};

export type KeywordOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
};

export type KeywordRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<KeywordWhereUniqueInput>>;
  create?: InputMaybe<Array<KeywordCreateInput>>;
};

export type KeywordRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<KeywordWhereUniqueInput>>;
  create?: InputMaybe<Array<KeywordCreateInput>>;
  disconnect?: InputMaybe<Array<KeywordWhereUniqueInput>>;
  set?: InputMaybe<Array<KeywordWhereUniqueInput>>;
};

export type KeywordUpdateArgs = {
  data: KeywordUpdateInput;
  where: KeywordWhereUniqueInput;
};

export type KeywordUpdateInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type KeywordWhereInput = {
  AND?: InputMaybe<Array<KeywordWhereInput>>;
  NOT?: InputMaybe<Array<KeywordWhereInput>>;
  OR?: InputMaybe<Array<KeywordWhereInput>>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
};

export type KeywordWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Link = {
  __typename?: 'Link';
  downloadFile?: Maybe<CustomFile>;
  downloadValue?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Icon>;
  id: Scalars['ID']['output'];
  isDownload?: Maybe<Scalars['Boolean']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  newTab?: Maybe<Scalars['Boolean']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type LinkCreateInput = {
  downloadFile?: InputMaybe<CustomFileRelateToOneForCreateInput>;
  downloadValue?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<IconRelateToOneForCreateInput>;
  isDownload?: InputMaybe<Scalars['Boolean']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  newTab?: InputMaybe<Scalars['Boolean']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type LinkManyRelationFilter = {
  every?: InputMaybe<LinkWhereInput>;
  none?: InputMaybe<LinkWhereInput>;
  some?: InputMaybe<LinkWhereInput>;
};

export type LinkOrderByInput = {
  downloadValue?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  isDownload?: InputMaybe<OrderDirection>;
  label?: InputMaybe<OrderDirection>;
  newTab?: InputMaybe<OrderDirection>;
  url?: InputMaybe<OrderDirection>;
};

export type LinkRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<LinkWhereUniqueInput>>;
  create?: InputMaybe<Array<LinkCreateInput>>;
};

export type LinkRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<LinkWhereUniqueInput>>;
  create?: InputMaybe<Array<LinkCreateInput>>;
  disconnect?: InputMaybe<Array<LinkWhereUniqueInput>>;
  set?: InputMaybe<Array<LinkWhereUniqueInput>>;
};

export type LinkRelateToOneForCreateInput = {
  connect?: InputMaybe<LinkWhereUniqueInput>;
  create?: InputMaybe<LinkCreateInput>;
};

export type LinkRelateToOneForUpdateInput = {
  connect?: InputMaybe<LinkWhereUniqueInput>;
  create?: InputMaybe<LinkCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type LinkUpdateArgs = {
  data: LinkUpdateInput;
  where: LinkWhereUniqueInput;
};

export type LinkUpdateInput = {
  downloadFile?: InputMaybe<CustomFileRelateToOneForUpdateInput>;
  downloadValue?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<IconRelateToOneForUpdateInput>;
  isDownload?: InputMaybe<Scalars['Boolean']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  newTab?: InputMaybe<Scalars['Boolean']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type LinkWhereInput = {
  AND?: InputMaybe<Array<LinkWhereInput>>;
  NOT?: InputMaybe<Array<LinkWhereInput>>;
  OR?: InputMaybe<Array<LinkWhereInput>>;
  downloadFile?: InputMaybe<CustomFileWhereInput>;
  downloadValue?: InputMaybe<StringFilter>;
  icon?: InputMaybe<IconWhereInput>;
  id?: InputMaybe<IdFilter>;
  isDownload?: InputMaybe<BooleanFilter>;
  label?: InputMaybe<StringFilter>;
  newTab?: InputMaybe<BooleanFilter>;
  url?: InputMaybe<StringFilter>;
};

export type LinkWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  authenticateUserWithPassword?: Maybe<UserAuthenticationWithPasswordResult>;
  createBio?: Maybe<Bio>;
  createBios?: Maybe<Array<Maybe<Bio>>>;
  createCustomFile?: Maybe<CustomFile>;
  createCustomFiles?: Maybe<Array<Maybe<CustomFile>>>;
  createCustomImage?: Maybe<CustomImage>;
  createCustomImages?: Maybe<Array<Maybe<CustomImage>>>;
  createGalleries?: Maybe<Array<Maybe<Gallery>>>;
  createGallery?: Maybe<Gallery>;
  createIcon?: Maybe<Icon>;
  createIconDisplay?: Maybe<IconDisplay>;
  createIconDisplays?: Maybe<Array<Maybe<IconDisplay>>>;
  createIcons?: Maybe<Array<Maybe<Icon>>>;
  createInitialUser: UserAuthenticationWithPasswordSuccess;
  createIntroduction?: Maybe<Introduction>;
  createIntroductions?: Maybe<Array<Maybe<Introduction>>>;
  createKeyword?: Maybe<Keyword>;
  createKeywords?: Maybe<Array<Maybe<Keyword>>>;
  createLink?: Maybe<Link>;
  createLinks?: Maybe<Array<Maybe<Link>>>;
  createPersonalLinkList?: Maybe<PersonalLinkList>;
  createPersonalLinkLists?: Maybe<Array<Maybe<PersonalLinkList>>>;
  createProject?: Maybe<Project>;
  createProjectDisplay?: Maybe<ProjectDisplay>;
  createProjectDisplays?: Maybe<Array<Maybe<ProjectDisplay>>>;
  createProjects?: Maybe<Array<Maybe<Project>>>;
  createRepositoryLink?: Maybe<RepositoryLink>;
  createRepositoryLinks?: Maybe<Array<Maybe<RepositoryLink>>>;
  createUser?: Maybe<User>;
  createUsers?: Maybe<Array<Maybe<User>>>;
  deleteBio?: Maybe<Bio>;
  deleteBios?: Maybe<Array<Maybe<Bio>>>;
  deleteCustomFile?: Maybe<CustomFile>;
  deleteCustomFiles?: Maybe<Array<Maybe<CustomFile>>>;
  deleteCustomImage?: Maybe<CustomImage>;
  deleteCustomImages?: Maybe<Array<Maybe<CustomImage>>>;
  deleteGalleries?: Maybe<Array<Maybe<Gallery>>>;
  deleteGallery?: Maybe<Gallery>;
  deleteIcon?: Maybe<Icon>;
  deleteIconDisplay?: Maybe<IconDisplay>;
  deleteIconDisplays?: Maybe<Array<Maybe<IconDisplay>>>;
  deleteIcons?: Maybe<Array<Maybe<Icon>>>;
  deleteIntroduction?: Maybe<Introduction>;
  deleteIntroductions?: Maybe<Array<Maybe<Introduction>>>;
  deleteKeyword?: Maybe<Keyword>;
  deleteKeywords?: Maybe<Array<Maybe<Keyword>>>;
  deleteLink?: Maybe<Link>;
  deleteLinks?: Maybe<Array<Maybe<Link>>>;
  deletePersonalLinkList?: Maybe<PersonalLinkList>;
  deletePersonalLinkLists?: Maybe<Array<Maybe<PersonalLinkList>>>;
  deleteProject?: Maybe<Project>;
  deleteProjectDisplay?: Maybe<ProjectDisplay>;
  deleteProjectDisplays?: Maybe<Array<Maybe<ProjectDisplay>>>;
  deleteProjects?: Maybe<Array<Maybe<Project>>>;
  deleteRepositoryLink?: Maybe<RepositoryLink>;
  deleteRepositoryLinks?: Maybe<Array<Maybe<RepositoryLink>>>;
  deleteUser?: Maybe<User>;
  deleteUsers?: Maybe<Array<Maybe<User>>>;
  endSession: Scalars['Boolean']['output'];
  updateBio?: Maybe<Bio>;
  updateBios?: Maybe<Array<Maybe<Bio>>>;
  updateCustomFile?: Maybe<CustomFile>;
  updateCustomFiles?: Maybe<Array<Maybe<CustomFile>>>;
  updateCustomImage?: Maybe<CustomImage>;
  updateCustomImages?: Maybe<Array<Maybe<CustomImage>>>;
  updateGalleries?: Maybe<Array<Maybe<Gallery>>>;
  updateGallery?: Maybe<Gallery>;
  updateIcon?: Maybe<Icon>;
  updateIconDisplay?: Maybe<IconDisplay>;
  updateIconDisplays?: Maybe<Array<Maybe<IconDisplay>>>;
  updateIcons?: Maybe<Array<Maybe<Icon>>>;
  updateIntroduction?: Maybe<Introduction>;
  updateIntroductions?: Maybe<Array<Maybe<Introduction>>>;
  updateKeyword?: Maybe<Keyword>;
  updateKeywords?: Maybe<Array<Maybe<Keyword>>>;
  updateLink?: Maybe<Link>;
  updateLinks?: Maybe<Array<Maybe<Link>>>;
  updatePersonalLinkList?: Maybe<PersonalLinkList>;
  updatePersonalLinkLists?: Maybe<Array<Maybe<PersonalLinkList>>>;
  updateProject?: Maybe<Project>;
  updateProjectDisplay?: Maybe<ProjectDisplay>;
  updateProjectDisplays?: Maybe<Array<Maybe<ProjectDisplay>>>;
  updateProjects?: Maybe<Array<Maybe<Project>>>;
  updateRepositoryLink?: Maybe<RepositoryLink>;
  updateRepositoryLinks?: Maybe<Array<Maybe<RepositoryLink>>>;
  updateUser?: Maybe<User>;
  updateUsers?: Maybe<Array<Maybe<User>>>;
};


export type MutationAuthenticateUserWithPasswordArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationCreateBioArgs = {
  data: BioCreateInput;
};


export type MutationCreateBiosArgs = {
  data: Array<BioCreateInput>;
};


export type MutationCreateCustomFileArgs = {
  data: CustomFileCreateInput;
};


export type MutationCreateCustomFilesArgs = {
  data: Array<CustomFileCreateInput>;
};


export type MutationCreateCustomImageArgs = {
  data: CustomImageCreateInput;
};


export type MutationCreateCustomImagesArgs = {
  data: Array<CustomImageCreateInput>;
};


export type MutationCreateGalleriesArgs = {
  data: Array<GalleryCreateInput>;
};


export type MutationCreateGalleryArgs = {
  data: GalleryCreateInput;
};


export type MutationCreateIconArgs = {
  data: IconCreateInput;
};


export type MutationCreateIconDisplayArgs = {
  data: IconDisplayCreateInput;
};


export type MutationCreateIconDisplaysArgs = {
  data: Array<IconDisplayCreateInput>;
};


export type MutationCreateIconsArgs = {
  data: Array<IconCreateInput>;
};


export type MutationCreateInitialUserArgs = {
  data: CreateInitialUserInput;
};


export type MutationCreateIntroductionArgs = {
  data: IntroductionCreateInput;
};


export type MutationCreateIntroductionsArgs = {
  data: Array<IntroductionCreateInput>;
};


export type MutationCreateKeywordArgs = {
  data: KeywordCreateInput;
};


export type MutationCreateKeywordsArgs = {
  data: Array<KeywordCreateInput>;
};


export type MutationCreateLinkArgs = {
  data: LinkCreateInput;
};


export type MutationCreateLinksArgs = {
  data: Array<LinkCreateInput>;
};


export type MutationCreatePersonalLinkListArgs = {
  data: PersonalLinkListCreateInput;
};


export type MutationCreatePersonalLinkListsArgs = {
  data: Array<PersonalLinkListCreateInput>;
};


export type MutationCreateProjectArgs = {
  data: ProjectCreateInput;
};


export type MutationCreateProjectDisplayArgs = {
  data: ProjectDisplayCreateInput;
};


export type MutationCreateProjectDisplaysArgs = {
  data: Array<ProjectDisplayCreateInput>;
};


export type MutationCreateProjectsArgs = {
  data: Array<ProjectCreateInput>;
};


export type MutationCreateRepositoryLinkArgs = {
  data: RepositoryLinkCreateInput;
};


export type MutationCreateRepositoryLinksArgs = {
  data: Array<RepositoryLinkCreateInput>;
};


export type MutationCreateUserArgs = {
  data: UserCreateInput;
};


export type MutationCreateUsersArgs = {
  data: Array<UserCreateInput>;
};


export type MutationDeleteBioArgs = {
  where?: BioWhereUniqueInput;
};


export type MutationDeleteBiosArgs = {
  where: Array<BioWhereUniqueInput>;
};


export type MutationDeleteCustomFileArgs = {
  where: CustomFileWhereUniqueInput;
};


export type MutationDeleteCustomFilesArgs = {
  where: Array<CustomFileWhereUniqueInput>;
};


export type MutationDeleteCustomImageArgs = {
  where: CustomImageWhereUniqueInput;
};


export type MutationDeleteCustomImagesArgs = {
  where: Array<CustomImageWhereUniqueInput>;
};


export type MutationDeleteGalleriesArgs = {
  where: Array<GalleryWhereUniqueInput>;
};


export type MutationDeleteGalleryArgs = {
  where?: GalleryWhereUniqueInput;
};


export type MutationDeleteIconArgs = {
  where: IconWhereUniqueInput;
};


export type MutationDeleteIconDisplayArgs = {
  where?: IconDisplayWhereUniqueInput;
};


export type MutationDeleteIconDisplaysArgs = {
  where: Array<IconDisplayWhereUniqueInput>;
};


export type MutationDeleteIconsArgs = {
  where: Array<IconWhereUniqueInput>;
};


export type MutationDeleteIntroductionArgs = {
  where?: IntroductionWhereUniqueInput;
};


export type MutationDeleteIntroductionsArgs = {
  where: Array<IntroductionWhereUniqueInput>;
};


export type MutationDeleteKeywordArgs = {
  where: KeywordWhereUniqueInput;
};


export type MutationDeleteKeywordsArgs = {
  where: Array<KeywordWhereUniqueInput>;
};


export type MutationDeleteLinkArgs = {
  where: LinkWhereUniqueInput;
};


export type MutationDeleteLinksArgs = {
  where: Array<LinkWhereUniqueInput>;
};


export type MutationDeletePersonalLinkListArgs = {
  where?: PersonalLinkListWhereUniqueInput;
};


export type MutationDeletePersonalLinkListsArgs = {
  where: Array<PersonalLinkListWhereUniqueInput>;
};


export type MutationDeleteProjectArgs = {
  where: ProjectWhereUniqueInput;
};


export type MutationDeleteProjectDisplayArgs = {
  where?: ProjectDisplayWhereUniqueInput;
};


export type MutationDeleteProjectDisplaysArgs = {
  where: Array<ProjectDisplayWhereUniqueInput>;
};


export type MutationDeleteProjectsArgs = {
  where: Array<ProjectWhereUniqueInput>;
};


export type MutationDeleteRepositoryLinkArgs = {
  where: RepositoryLinkWhereUniqueInput;
};


export type MutationDeleteRepositoryLinksArgs = {
  where: Array<RepositoryLinkWhereUniqueInput>;
};


export type MutationDeleteUserArgs = {
  where: UserWhereUniqueInput;
};


export type MutationDeleteUsersArgs = {
  where: Array<UserWhereUniqueInput>;
};


export type MutationUpdateBioArgs = {
  data: BioUpdateInput;
  where?: BioWhereUniqueInput;
};


export type MutationUpdateBiosArgs = {
  data: Array<BioUpdateArgs>;
};


export type MutationUpdateCustomFileArgs = {
  data: CustomFileUpdateInput;
  where: CustomFileWhereUniqueInput;
};


export type MutationUpdateCustomFilesArgs = {
  data: Array<CustomFileUpdateArgs>;
};


export type MutationUpdateCustomImageArgs = {
  data: CustomImageUpdateInput;
  where: CustomImageWhereUniqueInput;
};


export type MutationUpdateCustomImagesArgs = {
  data: Array<CustomImageUpdateArgs>;
};


export type MutationUpdateGalleriesArgs = {
  data: Array<GalleryUpdateArgs>;
};


export type MutationUpdateGalleryArgs = {
  data: GalleryUpdateInput;
  where?: GalleryWhereUniqueInput;
};


export type MutationUpdateIconArgs = {
  data: IconUpdateInput;
  where: IconWhereUniqueInput;
};


export type MutationUpdateIconDisplayArgs = {
  data: IconDisplayUpdateInput;
  where?: IconDisplayWhereUniqueInput;
};


export type MutationUpdateIconDisplaysArgs = {
  data: Array<IconDisplayUpdateArgs>;
};


export type MutationUpdateIconsArgs = {
  data: Array<IconUpdateArgs>;
};


export type MutationUpdateIntroductionArgs = {
  data: IntroductionUpdateInput;
  where?: IntroductionWhereUniqueInput;
};


export type MutationUpdateIntroductionsArgs = {
  data: Array<IntroductionUpdateArgs>;
};


export type MutationUpdateKeywordArgs = {
  data: KeywordUpdateInput;
  where: KeywordWhereUniqueInput;
};


export type MutationUpdateKeywordsArgs = {
  data: Array<KeywordUpdateArgs>;
};


export type MutationUpdateLinkArgs = {
  data: LinkUpdateInput;
  where: LinkWhereUniqueInput;
};


export type MutationUpdateLinksArgs = {
  data: Array<LinkUpdateArgs>;
};


export type MutationUpdatePersonalLinkListArgs = {
  data: PersonalLinkListUpdateInput;
  where?: PersonalLinkListWhereUniqueInput;
};


export type MutationUpdatePersonalLinkListsArgs = {
  data: Array<PersonalLinkListUpdateArgs>;
};


export type MutationUpdateProjectArgs = {
  data: ProjectUpdateInput;
  where: ProjectWhereUniqueInput;
};


export type MutationUpdateProjectDisplayArgs = {
  data: ProjectDisplayUpdateInput;
  where?: ProjectDisplayWhereUniqueInput;
};


export type MutationUpdateProjectDisplaysArgs = {
  data: Array<ProjectDisplayUpdateArgs>;
};


export type MutationUpdateProjectsArgs = {
  data: Array<ProjectUpdateArgs>;
};


export type MutationUpdateRepositoryLinkArgs = {
  data: RepositoryLinkUpdateInput;
  where: RepositoryLinkWhereUniqueInput;
};


export type MutationUpdateRepositoryLinksArgs = {
  data: Array<RepositoryLinkUpdateArgs>;
};


export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};


export type MutationUpdateUsersArgs = {
  data: Array<UserUpdateArgs>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type PasswordState = {
  __typename?: 'PasswordState';
  isSet: Scalars['Boolean']['output'];
};

export type PersonalLinkList = {
  __typename?: 'PersonalLinkList';
  id: Scalars['ID']['output'];
  links?: Maybe<Array<Link>>;
  linksCount?: Maybe<Scalars['Int']['output']>;
};


export type PersonalLinkListLinksArgs = {
  cursor?: InputMaybe<LinkWhereUniqueInput>;
  orderBy?: Array<LinkOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: LinkWhereInput;
};


export type PersonalLinkListLinksCountArgs = {
  where?: LinkWhereInput;
};

export type PersonalLinkListCreateInput = {
  links?: InputMaybe<LinkRelateToManyForCreateInput>;
};

export type PersonalLinkListOrderByInput = {
  id?: InputMaybe<OrderDirection>;
};

export type PersonalLinkListUpdateArgs = {
  data: PersonalLinkListUpdateInput;
  where?: PersonalLinkListWhereUniqueInput;
};

export type PersonalLinkListUpdateInput = {
  links?: InputMaybe<LinkRelateToManyForUpdateInput>;
};

export type PersonalLinkListWhereInput = {
  AND?: InputMaybe<Array<PersonalLinkListWhereInput>>;
  NOT?: InputMaybe<Array<PersonalLinkListWhereInput>>;
  OR?: InputMaybe<Array<PersonalLinkListWhereInput>>;
  id?: InputMaybe<IdFilter>;
  links?: InputMaybe<LinkManyRelationFilter>;
};

export type PersonalLinkListWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Project = {
  __typename?: 'Project';
  description?: Maybe<Project_Description_Document>;
  gallery?: Maybe<Array<CustomImage>>;
  galleryCount?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  projectContext?: Maybe<Scalars['String']['output']>;
  repository?: Maybe<RepositoryLink>;
  skills?: Maybe<Array<Keyword>>;
  skillsCount?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


export type ProjectGalleryArgs = {
  cursor?: InputMaybe<CustomImageWhereUniqueInput>;
  orderBy?: Array<CustomImageOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: CustomImageWhereInput;
};


export type ProjectGalleryCountArgs = {
  where?: CustomImageWhereInput;
};


export type ProjectSkillsArgs = {
  cursor?: InputMaybe<KeywordWhereUniqueInput>;
  orderBy?: Array<KeywordOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: KeywordWhereInput;
};


export type ProjectSkillsCountArgs = {
  where?: KeywordWhereInput;
};

export type ProjectCreateInput = {
  description?: InputMaybe<Scalars['JSON']['input']>;
  gallery?: InputMaybe<CustomImageRelateToManyForCreateInput>;
  projectContext?: InputMaybe<Scalars['String']['input']>;
  repository?: InputMaybe<RepositoryLinkRelateToOneForCreateInput>;
  skills?: InputMaybe<KeywordRelateToManyForCreateInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ProjectDisplay = {
  __typename?: 'ProjectDisplay';
  id: Scalars['ID']['output'];
  projects?: Maybe<Array<Project>>;
  projectsCount?: Maybe<Scalars['Int']['output']>;
};


export type ProjectDisplayProjectsArgs = {
  cursor?: InputMaybe<ProjectWhereUniqueInput>;
  orderBy?: Array<ProjectOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ProjectWhereInput;
};


export type ProjectDisplayProjectsCountArgs = {
  where?: ProjectWhereInput;
};

export type ProjectDisplayCreateInput = {
  projects?: InputMaybe<ProjectRelateToManyForCreateInput>;
};

export type ProjectDisplayOrderByInput = {
  id?: InputMaybe<OrderDirection>;
};

export type ProjectDisplayUpdateArgs = {
  data: ProjectDisplayUpdateInput;
  where?: ProjectDisplayWhereUniqueInput;
};

export type ProjectDisplayUpdateInput = {
  projects?: InputMaybe<ProjectRelateToManyForUpdateInput>;
};

export type ProjectDisplayWhereInput = {
  AND?: InputMaybe<Array<ProjectDisplayWhereInput>>;
  NOT?: InputMaybe<Array<ProjectDisplayWhereInput>>;
  OR?: InputMaybe<Array<ProjectDisplayWhereInput>>;
  id?: InputMaybe<IdFilter>;
  projects?: InputMaybe<ProjectManyRelationFilter>;
};

export type ProjectDisplayWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ProjectManyRelationFilter = {
  every?: InputMaybe<ProjectWhereInput>;
  none?: InputMaybe<ProjectWhereInput>;
  some?: InputMaybe<ProjectWhereInput>;
};

export type ProjectOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  projectContext?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
};

export type ProjectRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<ProjectWhereUniqueInput>>;
  create?: InputMaybe<Array<ProjectCreateInput>>;
};

export type ProjectRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<ProjectWhereUniqueInput>>;
  create?: InputMaybe<Array<ProjectCreateInput>>;
  disconnect?: InputMaybe<Array<ProjectWhereUniqueInput>>;
  set?: InputMaybe<Array<ProjectWhereUniqueInput>>;
};

export type ProjectUpdateArgs = {
  data: ProjectUpdateInput;
  where: ProjectWhereUniqueInput;
};

export type ProjectUpdateInput = {
  description?: InputMaybe<Scalars['JSON']['input']>;
  gallery?: InputMaybe<CustomImageRelateToManyForUpdateInput>;
  projectContext?: InputMaybe<Scalars['String']['input']>;
  repository?: InputMaybe<RepositoryLinkRelateToOneForUpdateInput>;
  skills?: InputMaybe<KeywordRelateToManyForUpdateInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ProjectWhereInput = {
  AND?: InputMaybe<Array<ProjectWhereInput>>;
  NOT?: InputMaybe<Array<ProjectWhereInput>>;
  OR?: InputMaybe<Array<ProjectWhereInput>>;
  gallery?: InputMaybe<CustomImageManyRelationFilter>;
  id?: InputMaybe<IdFilter>;
  projectContext?: InputMaybe<StringFilter>;
  repository?: InputMaybe<RepositoryLinkWhereInput>;
  skills?: InputMaybe<KeywordManyRelationFilter>;
  title?: InputMaybe<StringFilter>;
};

export type ProjectWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Project_Description_Document = {
  __typename?: 'Project_description_Document';
  document: Scalars['JSON']['output'];
};


export type Project_Description_DocumentDocumentArgs = {
  hydrateRelationships?: Scalars['Boolean']['input'];
};

export type Query = {
  __typename?: 'Query';
  authenticatedItem?: Maybe<AuthenticatedItem>;
  bio?: Maybe<Bio>;
  bios?: Maybe<Array<Bio>>;
  biosCount?: Maybe<Scalars['Int']['output']>;
  customFile?: Maybe<CustomFile>;
  customFiles?: Maybe<Array<CustomFile>>;
  customFilesCount?: Maybe<Scalars['Int']['output']>;
  customImage?: Maybe<CustomImage>;
  customImages?: Maybe<Array<CustomImage>>;
  customImagesCount?: Maybe<Scalars['Int']['output']>;
  galleries?: Maybe<Array<Gallery>>;
  galleriesCount?: Maybe<Scalars['Int']['output']>;
  gallery?: Maybe<Gallery>;
  icon?: Maybe<Icon>;
  iconDisplay?: Maybe<IconDisplay>;
  iconDisplays?: Maybe<Array<IconDisplay>>;
  iconDisplaysCount?: Maybe<Scalars['Int']['output']>;
  icons?: Maybe<Array<Icon>>;
  iconsCount?: Maybe<Scalars['Int']['output']>;
  introduction?: Maybe<Introduction>;
  introductions?: Maybe<Array<Introduction>>;
  introductionsCount?: Maybe<Scalars['Int']['output']>;
  keystone: KeystoneMeta;
  keyword?: Maybe<Keyword>;
  keywords?: Maybe<Array<Keyword>>;
  keywordsCount?: Maybe<Scalars['Int']['output']>;
  link?: Maybe<Link>;
  links?: Maybe<Array<Link>>;
  linksCount?: Maybe<Scalars['Int']['output']>;
  personalLinkList?: Maybe<PersonalLinkList>;
  personalLinkLists?: Maybe<Array<PersonalLinkList>>;
  personalLinkListsCount?: Maybe<Scalars['Int']['output']>;
  project?: Maybe<Project>;
  projectDisplay?: Maybe<ProjectDisplay>;
  projectDisplays?: Maybe<Array<ProjectDisplay>>;
  projectDisplaysCount?: Maybe<Scalars['Int']['output']>;
  projects?: Maybe<Array<Project>>;
  projectsCount?: Maybe<Scalars['Int']['output']>;
  repositoryLink?: Maybe<RepositoryLink>;
  repositoryLinks?: Maybe<Array<RepositoryLink>>;
  repositoryLinksCount?: Maybe<Scalars['Int']['output']>;
  user?: Maybe<User>;
  users?: Maybe<Array<User>>;
  usersCount?: Maybe<Scalars['Int']['output']>;
};


export type QueryBioArgs = {
  where?: BioWhereUniqueInput;
};


export type QueryBiosArgs = {
  cursor?: InputMaybe<BioWhereUniqueInput>;
  orderBy?: Array<BioOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: BioWhereInput;
};


export type QueryBiosCountArgs = {
  where?: BioWhereInput;
};


export type QueryCustomFileArgs = {
  where: CustomFileWhereUniqueInput;
};


export type QueryCustomFilesArgs = {
  cursor?: InputMaybe<CustomFileWhereUniqueInput>;
  orderBy?: Array<CustomFileOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: CustomFileWhereInput;
};


export type QueryCustomFilesCountArgs = {
  where?: CustomFileWhereInput;
};


export type QueryCustomImageArgs = {
  where: CustomImageWhereUniqueInput;
};


export type QueryCustomImagesArgs = {
  cursor?: InputMaybe<CustomImageWhereUniqueInput>;
  orderBy?: Array<CustomImageOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: CustomImageWhereInput;
};


export type QueryCustomImagesCountArgs = {
  where?: CustomImageWhereInput;
};


export type QueryGalleriesArgs = {
  cursor?: InputMaybe<GalleryWhereUniqueInput>;
  orderBy?: Array<GalleryOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: GalleryWhereInput;
};


export type QueryGalleriesCountArgs = {
  where?: GalleryWhereInput;
};


export type QueryGalleryArgs = {
  where?: GalleryWhereUniqueInput;
};


export type QueryIconArgs = {
  where: IconWhereUniqueInput;
};


export type QueryIconDisplayArgs = {
  where?: IconDisplayWhereUniqueInput;
};


export type QueryIconDisplaysArgs = {
  cursor?: InputMaybe<IconDisplayWhereUniqueInput>;
  orderBy?: Array<IconDisplayOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: IconDisplayWhereInput;
};


export type QueryIconDisplaysCountArgs = {
  where?: IconDisplayWhereInput;
};


export type QueryIconsArgs = {
  cursor?: InputMaybe<IconWhereUniqueInput>;
  orderBy?: Array<IconOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: IconWhereInput;
};


export type QueryIconsCountArgs = {
  where?: IconWhereInput;
};


export type QueryIntroductionArgs = {
  where?: IntroductionWhereUniqueInput;
};


export type QueryIntroductionsArgs = {
  cursor?: InputMaybe<IntroductionWhereUniqueInput>;
  orderBy?: Array<IntroductionOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: IntroductionWhereInput;
};


export type QueryIntroductionsCountArgs = {
  where?: IntroductionWhereInput;
};


export type QueryKeywordArgs = {
  where: KeywordWhereUniqueInput;
};


export type QueryKeywordsArgs = {
  cursor?: InputMaybe<KeywordWhereUniqueInput>;
  orderBy?: Array<KeywordOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: KeywordWhereInput;
};


export type QueryKeywordsCountArgs = {
  where?: KeywordWhereInput;
};


export type QueryLinkArgs = {
  where: LinkWhereUniqueInput;
};


export type QueryLinksArgs = {
  cursor?: InputMaybe<LinkWhereUniqueInput>;
  orderBy?: Array<LinkOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: LinkWhereInput;
};


export type QueryLinksCountArgs = {
  where?: LinkWhereInput;
};


export type QueryPersonalLinkListArgs = {
  where?: PersonalLinkListWhereUniqueInput;
};


export type QueryPersonalLinkListsArgs = {
  cursor?: InputMaybe<PersonalLinkListWhereUniqueInput>;
  orderBy?: Array<PersonalLinkListOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: PersonalLinkListWhereInput;
};


export type QueryPersonalLinkListsCountArgs = {
  where?: PersonalLinkListWhereInput;
};


export type QueryProjectArgs = {
  where: ProjectWhereUniqueInput;
};


export type QueryProjectDisplayArgs = {
  where?: ProjectDisplayWhereUniqueInput;
};


export type QueryProjectDisplaysArgs = {
  cursor?: InputMaybe<ProjectDisplayWhereUniqueInput>;
  orderBy?: Array<ProjectDisplayOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ProjectDisplayWhereInput;
};


export type QueryProjectDisplaysCountArgs = {
  where?: ProjectDisplayWhereInput;
};


export type QueryProjectsArgs = {
  cursor?: InputMaybe<ProjectWhereUniqueInput>;
  orderBy?: Array<ProjectOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ProjectWhereInput;
};


export type QueryProjectsCountArgs = {
  where?: ProjectWhereInput;
};


export type QueryRepositoryLinkArgs = {
  where: RepositoryLinkWhereUniqueInput;
};


export type QueryRepositoryLinksArgs = {
  cursor?: InputMaybe<RepositoryLinkWhereUniqueInput>;
  orderBy?: Array<RepositoryLinkOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: RepositoryLinkWhereInput;
};


export type QueryRepositoryLinksCountArgs = {
  where?: RepositoryLinkWhereInput;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  orderBy?: Array<UserOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: UserWhereInput;
};


export type QueryUsersCountArgs = {
  where?: UserWhereInput;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type RepositoryLink = {
  __typename?: 'RepositoryLink';
  id: Scalars['ID']['output'];
  link?: Maybe<Link>;
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type RepositoryLinkCreateInput = {
  link?: InputMaybe<LinkRelateToOneForCreateInput>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type RepositoryLinkOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
  type?: InputMaybe<OrderDirection>;
};

export type RepositoryLinkRelateToOneForCreateInput = {
  connect?: InputMaybe<RepositoryLinkWhereUniqueInput>;
  create?: InputMaybe<RepositoryLinkCreateInput>;
};

export type RepositoryLinkRelateToOneForUpdateInput = {
  connect?: InputMaybe<RepositoryLinkWhereUniqueInput>;
  create?: InputMaybe<RepositoryLinkCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type RepositoryLinkUpdateArgs = {
  data: RepositoryLinkUpdateInput;
  where: RepositoryLinkWhereUniqueInput;
};

export type RepositoryLinkUpdateInput = {
  link?: InputMaybe<LinkRelateToOneForUpdateInput>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type RepositoryLinkWhereInput = {
  AND?: InputMaybe<Array<RepositoryLinkWhereInput>>;
  NOT?: InputMaybe<Array<RepositoryLinkWhereInput>>;
  OR?: InputMaybe<Array<RepositoryLinkWhereInput>>;
  id?: InputMaybe<IdFilter>;
  link?: InputMaybe<LinkWhereInput>;
  title?: InputMaybe<StringFilter>;
  type?: InputMaybe<StringNullableFilter>;
};

export type RepositoryLinkWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<StringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isAdmin?: Maybe<Scalars['Boolean']['output']>;
  password?: Maybe<PasswordState>;
  userName?: Maybe<Scalars['String']['output']>;
};

export type UserAuthenticationWithPasswordFailure = {
  __typename?: 'UserAuthenticationWithPasswordFailure';
  message: Scalars['String']['output'];
};

export type UserAuthenticationWithPasswordResult = UserAuthenticationWithPasswordFailure | UserAuthenticationWithPasswordSuccess;

export type UserAuthenticationWithPasswordSuccess = {
  __typename?: 'UserAuthenticationWithPasswordSuccess';
  item: User;
  sessionToken: Scalars['String']['output'];
};

export type UserCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  isAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  userName?: InputMaybe<Scalars['String']['input']>;
};

export type UserOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  email?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  isAdmin?: InputMaybe<OrderDirection>;
  userName?: InputMaybe<OrderDirection>;
};

export type UserUpdateArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};

export type UserUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  isAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  userName?: InputMaybe<Scalars['String']['input']>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  isAdmin?: InputMaybe<BooleanFilter>;
  userName?: InputMaybe<StringFilter>;
};

export type UserWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  userName?: InputMaybe<Scalars['String']['input']>;
};

export type GetBioQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBioQuery = { bio: { content: { document: unknown } | null, textToHighlight: Array<{ name: string | null }> | null } | null };

export type GetGalleryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGalleryQuery = { gallery: { tagline: string | null, photos: Array<{ id: string, altText: string | null, image: { url: string } | null }> | null } | null };

export type GetIconDisplayQueryVariables = Exact<{ [key: string]: never; }>;


export type GetIconDisplayQuery = { iconDisplay: { icon: Array<{ label: string | null, svg: { title: string | null, altText: string | null, file: { url: string } | null } | null }> | null } | null };

export type GetIntroductionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetIntroductionQuery = { introduction: { heading: string | null, typingTerms: Array<{ name: string | null }> | null } | null };

export type GetPersonalLinkListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPersonalLinkListQuery = { personalLinkList: { links: Array<{ label: string | null, url: string | null, newTab: boolean | null, isDownload: boolean | null, downloadValue: string | null, downloadFile: { title: string | null, altText: string | null, file: { url: string } | null } | null, icon: { label: string | null, svg: { title: string | null, altText: string | null, file: { url: string } | null } | null } | null }> | null } | null };

export type GetProjectDisplayQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProjectDisplayQuery = { projectDisplay: { projects: Array<{ id: string, title: string | null, projectContext: string | null, description: { document: unknown } | null, skills: Array<{ name: string | null }> | null, gallery: Array<{ id: string, altText: string | null, image: { url: string } | null }> | null, repository: { title: string | null, type: string | null, link: { label: string | null, url: string | null } | null } | null }> | null } | null };


export const GetBioDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"document"}}]}},{"kind":"Field","name":{"kind":"Name","value":"textToHighlight"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetBioQuery, GetBioQueryVariables>;
export const GetGalleryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetGallery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gallery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"photos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"tagline"}}]}}]}}]} as unknown as DocumentNode<GetGalleryQuery, GetGalleryQueryVariables>;
export const GetIconDisplayDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetIconDisplay"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"iconDisplay"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"icon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"svg"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"file"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetIconDisplayQuery, GetIconDisplayQueryVariables>;
export const GetIntroductionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetIntroduction"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"introduction"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"heading"}},{"kind":"Field","name":{"kind":"Name","value":"typingTerms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetIntroductionQuery, GetIntroductionQueryVariables>;
export const GetPersonalLinkListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPersonalLinkList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"personalLinkList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"links"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"newTab"}},{"kind":"Field","name":{"kind":"Name","value":"isDownload"}},{"kind":"Field","name":{"kind":"Name","value":"downloadValue"}},{"kind":"Field","name":{"kind":"Name","value":"downloadFile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"file"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"icon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"svg"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"file"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetPersonalLinkListQuery, GetPersonalLinkListQueryVariables>;
export const GetProjectDisplayDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProjectDisplay"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projectDisplay"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"projectContext"}},{"kind":"Field","name":{"kind":"Name","value":"description"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"document"}}]}},{"kind":"Field","name":{"kind":"Name","value":"skills"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"gallery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"repository"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"link"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetProjectDisplayQuery, GetProjectDisplayQueryVariables>;