#!/bin/bash

echo "Pushing Docs to Storage"
tar -czf badger_docs.tar.gz docs && mc cp badger_docs.tar.gz minio/app && rm badger_docs.tar.gz

echo "Pushing Badger to Storage"
ls -t | grep -v node_modules | xargs tar -czf badger.tar.gz &&  mc cp badger.tar.gz minio/app && rm badger.tar.gz

echo ""
