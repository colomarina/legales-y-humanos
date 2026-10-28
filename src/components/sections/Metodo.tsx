import { metodo } from '@/content/site'
import { SectionIntro } from '@/components/layout/SectionIntro'
import './Metodo.css'

export function Metodo() {
  return (
    <section className="section metodo plane--paper" id="metodo">
      <div className="container">
        <SectionIntro number={metodo.number} kicker={metodo.kicker} title={metodo.title} />

        <ol className="timeline" data-reveal>
          {metodo.steps.map((step, index) => (
            <li className="timeline__step" key={step.title}>
              <div className="timeline__marker">
                <span aria-hidden="true">0{index + 1}</span>
              </div>
              <h3 className="timeline__title">{step.title}</h3>
              <p className="timeline__text">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
