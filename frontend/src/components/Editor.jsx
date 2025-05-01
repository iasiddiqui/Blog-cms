import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import "./Editor.css";

export default function Editor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: value || "<p>Start writing your content...</p>",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="dashboard-blog-card">
      <div
        className="editor-toolbar"
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "10px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`dashboard-edit-button ${
            editor.isActive("bold") ? "active" : ""
          }`}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`dashboard-edit-button ${
            editor.isActive("italic") ? "active" : ""
          }`}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`dashboard-edit-button ${
            editor.isActive("underline") ? "active" : ""
          }`}
        >
          Underline
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`dashboard-edit-button ${
            editor.isActive("strike") ? "active" : ""
          }`}
        >
          Strike
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`dashboard-edit-button ${
            editor.isActive("bulletList") ? "active" : ""
          }`}
        >
          • List
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`dashboard-edit-button ${
            editor.isActive("heading", { level: 2 }) ? "active" : ""
          }`}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`dashboard-edit-button ${
            editor.isActive("codeBlock") ? "active" : ""
          }`}
        >
          Code
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className="dashboard-edit-button"
        >
          Left
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className="dashboard-edit-button"
        >
          Center
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className="dashboard-edit-button"
        >
          Right
        </button>
      </div>

      <EditorContent
        editor={editor}
        className="editor-content"
        style={{
          minHeight: "300px",
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "white",
          fontSize: "16px",
          lineHeight: "1.6",
          outline: "none",
        }}
      />
    </div>
  );
}
