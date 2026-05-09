export default function Landing() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0a0a0a',
        color: '#fff',
        padding: '60px 40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div style={{ maxWidth: 800 }}>
        <h1
          style={{
            fontSize: 64,
            fontWeight: 800,
            marginBottom: 20,
            lineHeight: 1.1,
          }}
        >
          RapYard
        </h1>

        <p
          style={{
            fontSize: 22,
            opacity: 0.85,
            marginBottom: 40,
            maxWidth: 600,
          }}
        >
          The creator arena for cyphers, battles, mixtapes, and raw talent.
          Built for artists who want to sharpen their craft and own their sound.
        </p>

        <div style={{ display: 'flex', gap: 16 }}>
          <button
            style={{
              padding: '14px 28px',
              backgroundColor: '#fff',
              color: '#000',
              borderRadius: 8,
              fontSize: 18,
              fontWeight: 600,
              cursor: 'pointer',
              border: 'none',
            }}
          >
            Join the Waitlist
          </button>

          <button
            style={{
              padding: '14px 28px',
              backgroundColor: '#111',
              color: '#fff',
              border: '1px solid #333',
              borderRadius: 8,
              fontSize: 18,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Learn More
          </button>
        </div>

        <div style={{ marginTop: 80, opacity: 0.5, fontSize: 14 }}>
          © {new Date().getFullYear()} RapYard. All rights reserved.
        </div>
      </div>
    </div>
  )
}
