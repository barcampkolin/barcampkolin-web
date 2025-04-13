# shellcheck disable=SC2086
set -eu;

SCRIPT_DIR="$(dirname $0)";
SOURCE_DIR="$(dirname $SCRIPT_DIR)";

composer global exec deployment -- $SOURCE_DIR/.deployment.php -t
