import type { Project } from "@/types"

export const projects: Project[] = [
  {
    slug: "codexia",
    name: "CodeXia",
    tagline: "Real-time collaborative coding platform",
    role: "Solo · Full stack",
    year: "2025",
    problem:
      "Coding together usually means screen sharing, pasting snippets back and forth, and leaving the editor to run code or look for help.",
    solution:
      "One workspace where a whole team edits the same code live, runs it safely in three languages and gets AI help without leaving the editor. I built it alone, frontend to backend.",
    facts: [
      { value: "10+", label: "coders editing live, conflict-free" },
      { value: "3", label: "languages run in isolated sandboxes" },
      { value: "10–15m", label: "saved per session with in-editor AI (est.)" },
    ],
    system: {
      nodes: [
        {
          id: "editor",
          label: "Editor",
          tech: "React · Redux Toolkit",
          detail:
            "The shared editor and a CodePen-style live playground, with external CSS and JS libraries.",
          x: 14,
          y: 50,
        },
        {
          id: "realtime",
          label: "Realtime sync",
          tech: "Socket.io",
          detail:
            "Broadcasts every keystroke so 10+ people can edit the same file without conflicts.",
          x: 46,
          y: 18,
        },
        {
          id: "api",
          label: "API",
          tech: "Node.js · Express · JWT",
          detail:
            "Accounts with JWT and email OTP verification, projects, and in-app plus email notifications.",
          x: 46,
          y: 72,
        },
        {
          id: "ai",
          label: "AI assistant",
          tech: "Groq API",
          detail:
            "Answers and fixes inside the editor, so nobody switches tools mid-flow.",
          x: 84,
          y: 18,
        },
        {
          id: "sandbox",
          label: "Code sandbox",
          tech: "JS · Python · C++",
          detail:
            "Runs code in isolated runtimes with a 10 second timeout, so nothing can hog the server.",
          x: 84,
          y: 50,
        },
        {
          id: "data",
          label: "Data",
          tech: "MongoDB · Redis",
          detail:
            "MongoDB keeps the work; Redis caches hot data so the app stays fast as it grows.",
          x: 84,
          y: 82,
        },
      ],
      edges: [
        { from: "editor", to: "realtime", label: "WebSocket" },
        { from: "editor", to: "api", label: "REST" },
        { from: "api", to: "ai", label: "Prompt" },
        { from: "api", to: "sandbox", label: "Run" },
        { from: "api", to: "data", label: "Read · write" },
      ],
    },
    image: "/images/projects/codexia.png",
    stack: [
      "React",
      "Redux Toolkit",
      "Node.js",
      "Express",
      "MongoDB",
      "Redis",
      "Socket.io",
      "Groq API",
    ],
    links: {
      live: "https://codexia-final.vercel.app",
      github: "https://github.com/pratham-nemade/Codexia-Final",
    },
  },
  {
    slug: "geo-data",
    name: "Geo-Data",
    tagline: "Geospatial data on an interactive map",
    role: "Full stack",
    year: "2024",
    problem:
      "Map files like GeoJSON and KML are awkward to open, check and edit without specialist GIS software.",
    solution:
      "A web app that puts them on an interactive map in seconds, lets you draw and edit your own shapes and keeps everything saved to your account. Go on the backend and React on the front, picked on purpose to work outside my usual stack.",
    facts: [
      { value: "2", label: "map formats, GeoJSON and KML" },
      { value: "Go", label: "backend paired with a React frontend" },
      { value: "Draw", label: "save and edit your own shapes on the map" },
    ],
    system: {
      nodes: [
        {
          id: "files",
          label: "Uploads",
          tech: "GeoJSON · KML",
          detail: "Drop in a map file and it is ready to view straight away.",
          x: 13,
          y: 24,
        },
        {
          id: "map",
          label: "Map",
          tech: "React · Leaflet",
          detail:
            "Renders the data on an interactive map, with tools to draw, save and edit custom shapes.",
          x: 38,
          y: 58,
        },
        {
          id: "server",
          label: "Server",
          tech: "Go",
          detail: "A Go service handles the processing and every save.",
          x: 63,
          y: 30,
        },
        {
          id: "auth",
          label: "Accounts",
          tech: "Sign-up · Login",
          detail: "Each person's maps and shapes stay private to them.",
          x: 87,
          y: 18,
        },
        {
          id: "db",
          label: "Database",
          tech: "PostgreSQL",
          detail: "Stores uploaded data and drawn shapes so nothing is lost.",
          x: 87,
          y: 76,
        },
      ],
      edges: [
        { from: "files", to: "map", label: "Load" },
        { from: "map", to: "server", label: "REST" },
        { from: "server", to: "auth", label: "Verify" },
        { from: "server", to: "db", label: "Persist" },
      ],
    },
    image: "/images/projects/geodata.jpg",
    stack: ["React", "Go", "PostgreSQL", "React Leaflet"],
    links: {
      live: "https://geo-data-app.netlify.app",
      github: "https://github.com/pratham-nemade/Geo-Data",
    },
  },
  {
    slug: "zestform",
    name: "ZestForm",
    tagline: "Drag-and-drop form builder",
    role: "Frontend",
    year: "2024",
    problem:
      "Hand-coding forms is slow, and every change to a field means editing markup again.",
    solution:
      "A visual builder where a form is just JSON: drag fields into order, edit them inline, and save the updated schema. Pure JavaScript, no framework.",
    facts: [
      { value: "0", label: "dependencies, plain JavaScript" },
      { value: "3", label: "field types: inputs, selects, textareas" },
      { value: "1:1", label: "form and JSON stay in sync" },
    ],
    system: {
      nodes: [
        {
          id: "schema",
          label: "JSON schema",
          tech: "Source of truth",
          detail: "The whole form lives in one JSON structure.",
          x: 13,
          y: 50,
        },
        {
          id: "render",
          label: "Renderer",
          tech: "Vanilla JS",
          detail: "Builds the live form from the schema, field by field.",
          x: 40,
          y: 22,
        },
        {
          id: "drag",
          label: "Drag & drop",
          tech: "Vanilla JS",
          detail: "Reorder any field by dragging it into place.",
          x: 66,
          y: 22,
        },
        {
          id: "edit",
          label: "Inline editing",
          tech: "Labels · options",
          detail:
            "Edit labels, placeholders and select options right on the form, or delete a field.",
          x: 53,
          y: 80,
        },
        {
          id: "save",
          label: "Save",
          tech: "JSON out",
          detail: "Writes the updated structure back out as JSON.",
          x: 87,
          y: 50,
        },
      ],
      edges: [
        { from: "schema", to: "render", label: "Render" },
        { from: "render", to: "drag", label: "Reorder" },
        { from: "render", to: "edit", label: "Edit" },
        { from: "drag", to: "save", label: "Update" },
        { from: "edit", to: "save", label: "Update" },
      ],
    },
    image: "/images/projects/zestform.png",
    stack: ["JavaScript", "HTML", "CSS"],
    links: {
      live: "https://zestform.netlify.app",
      github: "https://github.com/pratham-nemade/ZestForm",
    },
  },
]
