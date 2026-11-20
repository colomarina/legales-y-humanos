import { useState } from 'react'
import { contactChannels, preguntas, type FaqGroup } from '@/content/site'
import { SectionIntro } from '@/components/layout/SectionIntro'
import { Button, TONE_BY_DISCIPLINE } from '@/components/ui/Button'
import { useContactChannel } from '@/context/ContactChannelContext'
import './Preguntas.css'

type GroupId = FaqGroup['id']

const questionId = (groupId: GroupId, index: number) => `pregunta-${groupId}-${index + 1}`

const FIRST_QUESTIONS = preguntas.groups.map((group) => questionId(group.id, 0))

const whatsappFor = (groupId: GroupId) =>
  contactChannels.find((channel) => channel.id === groupId)?.whatsapp ?? contactChannels[0].whatsapp

export function Preguntas() {
  const [activeGroup, setActiveGroup] = useState<GroupId>(preguntas.groups[0].id)
  const [openQuestions, setOpenQuestions] = useState<ReadonlySet<string>>(() => new Set(FIRST_QUESTIONS))
  const { select } = useContactChannel()

  const toggle = (id: string) =>
    setOpenQuestions((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <section className="section preguntas plane--paper" id="preguntas">
      <div className="container">
        <SectionIntro
          number={preguntas.number}
          title={preguntas.title}
          titleAccent={preguntas.titleAccent}
        />

        <div className="preguntas__body" data-reveal>
          <fieldset className="preguntas__switch">
            <legend className="visually-hidden">{preguntas.switchLabel}</legend>
            {preguntas.groups.map((group) => (
              <label
                className={`preguntas__switch-option preguntas__switch-option--${group.tone}${
                  group.id === activeGroup ? ' is-active' : ''
                }`}
                key={group.id}
              >
                <input
                  className="visually-hidden"
                  type="radio"
                  name="preguntas-grupo"
                  value={group.id}
                  checked={group.id === activeGroup}
                  onChange={() => setActiveGroup(group.id)}
                />
                {group.label}
              </label>
            ))}
          </fieldset>

          <div className="preguntas__groups">
            {preguntas.groups.map((group) => (
              <div
                className={`preguntas__group preguntas__group--${group.tone}${
                  group.id === activeGroup ? ' is-active' : ''
                }`}
                key={group.id}
              >
                <h3 className="preguntas__group-title" id={`preguntas-${group.id}`}>
                  {group.label}
                </h3>
                <ul className="preguntas__list" aria-labelledby={`preguntas-${group.id}`}>
                  {group.items.map((item, index) => {
                    const id = questionId(group.id, index)
                    const isOpen = openQuestions.has(id)
                    return (
                      <li className={`preguntas__item${isOpen ? ' is-open' : ''}`} key={id}>
                        <h4 className="preguntas__heading">
                          <button
                            className="preguntas__question"
                            type="button"
                            aria-expanded={isOpen}
                            aria-controls={`${id}-respuesta`}
                            onClick={() => toggle(id)}
                          >
                            <span>{item.question}</span>
                            <span className="preguntas__toggle" aria-hidden="true" />
                          </button>
                        </h4>
                        <div className="preguntas__panel" id={`${id}-respuesta`} inert={!isOpen}>
                          <div className="preguntas__panel-inner">
                            <p className="preguntas__answer">{item.answer}</p>
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
                <div className="preguntas__cta">
                  <p className="preguntas__cta-text">{preguntas.cta.text}</p>
                  <div className="preguntas__cta-actions">
                    <Button
                      href={preguntas.cta.href}
                      tone={TONE_BY_DISCIPLINE[group.tone]}
                      onClick={() => select(group.id)}
                    >
                      {preguntas.cta.label}
                    </Button>
                    <a
                      className="preguntas__cta-whatsapp"
                      href={whatsappFor(group.id)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {preguntas.cta.whatsappLabel}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
