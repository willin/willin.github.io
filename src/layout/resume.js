import { h } from 'hyperapp';
import WItemSkill from '../component/item_skill';
import WItemResume from '../component/item_resume';
import { programmingSkills, databaseSkills, toolSkills, resume } from '../config';

export default ({ state: { i18n } }) => (
  <article id="resume" class="hidden">
    <div class="bg"></div>
    <aside>
      <h3><span>{i18n.programming_skills}</span></h3>
      <ul>
        {programmingSkills.map(x => (
          <WItemSkill props={x} />
        ))}
      </ul>
      <h3><span>{i18n.database_skills}</span></h3>
      <ul>
        {databaseSkills.map(x => (
          <WItemSkill props={x} />
        ))}
      </ul>
      <h3><span>{i18n.tool_skills}</span></h3>
      <ul>
        {toolSkills.map(x => (
          <WItemSkill props={x} />
        ))}
      </ul>
    </aside>
    <section>
      <h3><span>Resume</span></h3>
      <ul class="timeline">
        {resume.map(x => (
          <WItemResume props={Object.assign({}, x, {
            title: i18n[x.title],
            company: i18n[x.company],
            desc: i18n[`${x.company}_desc`],
            to: i18n[x.to] || x.to
          })} />
        ))}
      </ul>
    </section>
  </article>
);
