#!/bin/bash

mkdir -p i18n/$1/docusaurus-plugin-content-docs/current
cp -r docs/** i18n/$1/docusaurus-plugin-content-docs/current

mkdir -p i18n/$1/docusaurus-plugin-content-blog
cp -r blog/** i18n/$1/docusaurus-plugin-content-blog

mkdir -p i18n/$1/docusaurus-plugin-content-pages
cp -r src/pages/**.md i18n/$1/docusaurus-plugin-content-pages