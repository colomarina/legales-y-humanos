import type { Profile } from '@/content/site'
import { nosotras } from '@/content/site'
import { Portrait } from '@/components/ui/Portrait'
import { SectionIntro } from '@/components/layout/SectionIntro'
import './Nosotras.css'

function ProfileCard({ profile }: { profile: Profile }) {
  return (
    <article className={`profile profile--${profile.tone}`} data-reveal>
      <div className="profile__portrait">
        <Portrait tone={profile.tone} photo={profile.photo} />
      </div>
      <div className="profile__body">
        <p className="kicker kicker--ruled profile__discipline">{profile.discipline}</p>
        <h3 className="profile__name">
          {profile.name}
          <span aria-hidden="true">.</span>
        </h3>
        <p className="profile__role">{profile.role}</p>
        <p className="profile__bio">{profile.bio}</p>
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
          title={nosotras.title}
          titleAccent={nosotras.titleAccent}
          ruleAccent="blue"
          align="center"
        />

        <div className="nosotras__profiles">
          {nosotras.profiles.map((profile) => (
            <ProfileCard key={profile.name} profile={profile} />
          ))}
        </div>

        <aside className="founders-banner plane--deep" data-reveal>
          <div className="founders-banner__text">
            <p className="founders-banner__statement">
              {nosotras.banner.lineOne}
              <br />
              <em>{nosotras.banner.lineTwo}</em>
            </p>
            <span className="founders-banner__rule" aria-hidden="true" />
            <span className="founders-banner__caption">{nosotras.banner.caption}</span>
          </div>
          <figure className="founders-banner__media">
            <img
              src={nosotras.banner.photo.src}
              alt={nosotras.banner.photo.alt}
              width={nosotras.banner.photo.width}
              height={nosotras.banner.photo.height}
              loading="lazy"
              decoding="async"
            />
          </figure>
        </aside>
      </div>
    </section>
  )
}
