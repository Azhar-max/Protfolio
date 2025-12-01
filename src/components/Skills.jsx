import React from 'react'
import { FaCode, FaUserGraduate, FaPaintBrush, FaMobileAlt, FaBullhorn, FaChartLine, FaShieldAlt, FaCubes, FaReact, FaDraftingCompass } from "react-icons/fa";

const skillCategories = [
  {
    category: "Development",
    skills: [
      {title:'Software Engineer', desc:'Full-stack thinking, problem solving', icon: <FaCode />},
      {title:'React Native App Developer', desc:'Cross-platform apps', icon: <FaReact />},
      {title:'Blockchain Developer', desc:'Smart contracts & dapps', icon: <FaCubes />},
    ]
  },
  {
    category: "Design",
    skills: [
      {title:'Web Designer', desc:'Design systems & responsive layouts', icon: <FaPaintBrush />},
      {title:'Application Designer', desc:'Mobile & Desktop app UX', icon: <FaMobileAlt />},
      {title:'UI/UX Designer', desc:'User-centric interfaces', icon: <FaDraftingCompass />},
    ]
  },
  {
    category: "Other",
    skills: [
      {title:'Student', desc:'BS Software Engineering - UET Mardan', icon: <FaUserGraduate />},
      {title:'Social Media Marketer', desc:'Campaigns & growth', icon: <FaBullhorn />},
      {title:'Social Media Expert', desc:'Strategy & analytics', icon: <FaChartLine />},
      {title:'Cyber Security Expert', desc:'Security best practices', icon: <FaShieldAlt />},
    ]
  }
]

export default function Skills(){
  return (
    <section id="skills" className="card" aria-label="Skills" style={{marginTop:18}}>
      <h3>Skills</h3>
      <p style={{color:'var(--muted)'}}>A selection of my main skills & expertise.</p>
      <div className="skills-container">
        {skillCategories.map((category, index) => (
          <div key={index} className="skills-category">
            <h4 style={{marginBottom: '12px', color: 'var(--accent-color)'}}>{category.category}</h4>
            <div className="skills-grid" style={{marginTop:12, display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:'16px'}}>
              {category.skills.map(s=>(
                <div className="skill" key={s.title} style={{display:'flex', alignItems:'center', gap:'10px'}}>
                  <div className="icon" aria-hidden style={{fontSize:'1.5rem', color:'var(--accent-color)'}}>{s.icon}</div>
                  <div>
                    <div style={{fontWeight:700}}>{s.title}</div>
                    <div style={{color:'var(--muted)', fontSize:13}}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
