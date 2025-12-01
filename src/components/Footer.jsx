import AccessibilityStatement from './AccessibilityStatement';

export default function Footer() {
  return (
    <footer className="footer">
      <AccessibilityStatement />
      <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid var(--border-color)' }}>
        © {new Date().getFullYear()} Azhar Ali Shah — Built with React •{" "}
        <a
          href="https://www.linkedin.com/in/azhar-ali-shah-72a4571b8/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "inherit" }}
        >
          LinkedIn
        </a>{" "}
        •{" "}
        <a
          href="https://github.com/Azhar-max"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "inherit" }}
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
