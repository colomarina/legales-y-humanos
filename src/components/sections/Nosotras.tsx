import type { Profile } from '@/content/site'
import { nosotras } from '@/content/site'
import { Geometry } from '@/components/ui/Geometry'
import { Portrait } from '@/components/ui/Portrait'
import { SectionIntro } from '@/components/layout/SectionIntro'
import './Nosotras.css'

function ProfileCard({ profile }: { profile: Profile }) {
  return (
    <article className={`profile profile--${profile.tone}`} data-reveal>
      <div className="profile__portrait">
        <Portrait tone={profile.tone} label={profile.portraitAlt} />
      </div>
      <div className="profile__body">
        <p className="kicker profile__discipline">{profile.discipline}</p>
        <h3 className="profile__name">
          {profile.name}
          <span aria-hidden="true">.</span>
        </h3>
        <p className="profile__role">{profile.role}</p>
        <blockquote className="profile__quote">
          <p>{profile.quote}</p>
        </blockquote>
        <ul className="profile__skills">
          {profile.skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export function Nosotras() {
  return (
    <section className="section nosotras plane--paper" id="nosotras">
      <div className="container">
        <SectionIntro
          number={nosotras.number}
          kicker={nosotras.kicker}
          title={nosotras.title}
        />

        <div className="nosotras__profiles">
          {nosotras.profiles.map((profile) => (
            <ProfileCard key={profile.name} profile={profile} />
          ))}
        </div>

        <aside className="founders-banner plane--deep" data-reveal>
          <Geometry variant="banner" />
          <p className="founders-banner__statement">
            {nosotras.banner.lineOne}
            <br />
            <em>{nosotras.banner.lineTwo}</em>
          </p>
          <span className="founders-banner__caption">{nosotras.banner.caption}</span>
        </aside>
      </div>
    </section>
  )
}
