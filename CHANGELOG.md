# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 0.1.3 - 2026-05-07

### Fixed

- Typings: adding/removing `change` event listeners on `ContainerQueryList` with `ContainerQueryListEvent` event args was not recognized by TypeScript
  (see [discussion](https://github.com/teetotum/match-container/issues/4))

## 0.1.2 - 2026-04-21

### Fixed

- Typings: global package types were not recognized by TypeScript
  (see [discussion](https://github.com/teetotum/match-container/pull/3))

## 0.1.1 - 2026-02-22

### Fixed

- Functionality: a `@starting-style` was necessary for elements that would render in the DOM already in their _matching_ state without transitioning from _non-matching_ to _matching_
  (see [discussion](https://github.com/teetotum/match-container/pull/2))

## 0.1.0 - 2025-02-24

### Added

- initial implementation of `Element.matchContainer()` polyfill
- documentation
