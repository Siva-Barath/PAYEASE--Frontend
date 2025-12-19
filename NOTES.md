# React Core Concepts - Notes

## JSX (JavaScript XML)
JSX is a syntax extension for JavaScript that allows writing HTML-like code in JavaScript files. It gets compiled to React.createElement() calls. JSX makes component structure more readable and allows embedding JavaScript expressions using curly braces {}. It's not mandatory but widely used in React development.

## Virtual DOM
Virtual DOM is a lightweight JavaScript representation of the actual DOM. React maintains a virtual copy of the UI in memory and compares it with the previous version when state changes. Only the differences are updated in the real DOM, making updates efficient and fast.

## Functional Components
Functional components are JavaScript functions that return JSX. They are simpler than class components and use React Hooks for state and lifecycle features. They accept props as arguments and are the modern standard for writing React components.

## Props (Properties)
Props are read-only data passed from parent to child components. They enable component reusability by making components dynamic and configurable. Props flow in one direction (top-down) and cannot be modified by the receiving component.

## State
State is mutable data managed within a component using useState hook. When state changes, React re-renders the component to reflect updates. State is local to the component and can be passed to children as props.

## Component Hierarchy
Component hierarchy is the tree structure of parent-child relationships between components. Parent components can pass data down to children via props, and children can communicate with parents through callback functions. This creates a unidirectional data flow pattern.

## Folder Structuring
Proper folder structure organizes code by feature or type (components, pages, context, utils, data). Common structure includes src/components for reusable UI, src/pages for route components, src/context for global state, and src/data for constants. This improves maintainability and scalability.
