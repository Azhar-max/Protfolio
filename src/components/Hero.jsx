import React from 'react'
import profile from '../assets/profile.png'

export default function Hero(){
  return (
    <section className="hero" id="home" aria-label="Intro">
      <div className="left">
        <div className="card">
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <div>
              <div style={{fontSize:12,color:'var(--muted)'}}>Hello, I'm</div>
              <div className="name">Azhar Ali Shah</div>
              <div className="role">BS Software Engineering Student — UET Mardan</div>
              <p style={{marginTop:8,color:'var(--muted)'}}>
                I'm a multi-discipline Software Engineer & Designer. I build user-friendly, secure, and beautiful web & mobile
                products. I also work with social media strategies, blockchain ideas, and cybersecurity practices.
              </p>
              <div className="cta" style={{marginTop:12}}>
                <a className="btn" href="#contact">Hire Me</a>
                <a style={{color:'var(--muted)',textDecoration:'none',fontWeight:600}} href="#projects">View Projects</a>
              </div>
            </div>
            <div style={{fontSize:12,color:'var(--muted)',textAlign:'right'}}>
              <div>UET Mardan</div>
              <div style={{marginTop:6}}>BS Software Engineering</div>
            </div>
          </div>
        </div>

        <div style={{marginTop:14}} className="card bio">
          <strong>Quick Info</strong>
          <div className="info-grid" style={{marginTop:8}}>
            <div><strong>Name</strong><div style={{color:'var(--muted)'}}>Azhar Ali Shah</div></div>
            <div><strong>Role</strong><div style={{color:'var(--muted)'}}>Software Engineer / Student</div></div>
            <div><strong>Location</strong><div style={{color:'var(--muted)'}}>Mardan, Pakistan</div></div>
            <div><strong>Education</strong><div style={{color:'var(--muted)'}}>BS Software Eng. — UET Mardan</div></div>
          </div>
        </div>
      </div>

      <div className="right">
        <div className="card" style={{textAlign:'center'}}>
          <img src={profile} alt="Azhar Ali Shah" style={{width: '100%', borderRadius:12, objectFit:'cover'}} loading="lazy" decoding="async" />
          <div style={{marginTop:12}}>
            <div style={{fontWeight:800}}>Azhar Ali Shah</div>
            <div style={{color:'var(--muted)',fontSize:13}}>Software Engineer • UI/UX • Cybersecurity</div>
          </div>
        </div>
      </div>
    </section>
  )
}
