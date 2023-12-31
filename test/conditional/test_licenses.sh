#!/bin/bash
# Checks that none of the currently installed pip requirements are
# GPL because it would violate the licenses of those requirements
# because Kolibri is MIT and thus cannot re-distribute GPL as such.
#
# This is also intended as a proof-of-concept as we should head
# in a direction of fetching licenses automatically and bundle them
# automatically. Currently, packages have some info included in
# kolibri/dist/*-info

set -e

# Put requirement with a ";" at the end
# Ignoring: docutils, because it's not distributed.
# Ignoring: nose because it's something Travis installs in its Python 3.5
#           environment without it being distributed by us.
IGNORES="docutils;nose;"

echo "Checking all requirements installed with pip, except $IGNORES..."

for requirement in `pip freeze | grep -v '^-e' | sed 's/\(.*\)==.*/\1/'`
do
    if echo "$IGNORES" | grep -q "$requirement;" && true
    then
        continue
    fi


    details=`pip show "$requirement" || echo ""`

    # This check is not concerned with system level packages, so ignore
    # anything found here.
    if echo "$details" | grep -q "dist-packages" && true
    then
        continue
    fi

    license=`echo "$details" | grep -i "License" || echo ""`
    if echo "$license" | grep -qi " gpl" && true
    then
        echo "Problem! Incompatible license found in $requirement"
        echo "Details:\n\n$details"
        exit 14
    fi
done

if yarn licenses list | grep -iP '(?<!OR )(?<!L)GPL(?! OR)'
# If any output from the above, then we have found something, use && true to coerce to boolean
then
    echo "Problem! Incompatible license found in Javascript dependencies"
    exit 14
fi

exit 0
