#!/usr/bin/env bash
set -eE

# default for development
slack_hook="unset"

# set to SLACKHOOK env var or default if not present
hook_url="${SLACKHOOK:-$slack_hook}"

# create JSON data
json=$(cat <<-END
    {
        "slackHookURL": "$hook_url"
    }
END
)

# safe it to config.json
echo "creating src/config.json"
echo "$json" > "src/config.json"
