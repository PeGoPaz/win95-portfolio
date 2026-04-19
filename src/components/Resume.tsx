import { Checkbox, Fieldset, ProgressBar, Tab, Tabs } from '@react95/core';

function Resume() {
  return (
    <Tabs defaultActiveTab="About">
      <Tab title="About">
        <h3>Software Developer</h3>

        <p>
          Software developer with experience in Java, SQL, and modern web technologies, 
          focused on building reliable backend systems and data-driven applications.
        </p>
        <Fieldset legend="Experience">
          <p>
            Experienced working with banking software and large reporting systems, 
            including validating and modifying hundreds of database-driven reports. 
            Comfortable working with Linux environments, Git workflows, and modern 
            development tools.
          </p>
        </Fieldset>
      </Tab>
      
      <Tab title="Certificates">
        <Fieldset legend="Languages">
          <Checkbox readOnly checked>
            IELTS Academic | December 2021
          </Checkbox>
        </Fieldset>
        <Fieldset legend="Development">
          <Checkbox readOnly checked>
            “Junior Java Developer” from SkyPro | Mar 2022 – Feb 2023
          </Checkbox>
          <p style={{ margin: "8px 0 0 0" }}>
            <a href="https://sky.pro/courses/programming/javadeveloper#giftpopup" target="_blank" rel="noreferrer" style={{ color: "inherit" }}>
              View Course Details
            </a>
          </p>
        </Fieldset>
      </Tab>
      
      <Tab title="Skills">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          <Fieldset legend="Programming">
            <ul>
              <li className="resume-skills">Java</li>
              <ProgressBar percent={95} width="200px" />
              <li className="resume-skills">SQL</li>
              <ProgressBar percent={90} width="200px" />
              <li className="resume-skills">JavaScript</li>
              <ProgressBar percent={85} width="200px" />
              <li className="resume-skills">HTML & CSS</li>
              <ProgressBar percent={85} width="200px" />
              <li className="resume-skills">Python</li>
              <ProgressBar percent={75} width="200px" />
            </ul>
          </Fieldset>
          
          <Fieldset legend="Backend & Web">
            <ul>
              <li className="resume-skills">REST APIs</li>
              <ProgressBar percent={90} width="200px" />
              <li className="resume-skills">Node.js</li>
              <ProgressBar percent={85} width="200px" />
              <li className="resume-skills">React</li>
              <ProgressBar percent={80} width="200px" />
              <li className="resume-skills">Next.js</li>
              <ProgressBar percent={75} width="200px" />
            </ul>
          </Fieldset>
          
          <Fieldset legend="Databases & Tools">
            <ul>
              <li className="resume-skills">Git & npm</li>
              <ProgressBar percent={95} width="200px" />
              <li className="resume-skills">Linux & Bash</li>
              <ProgressBar percent={85} width="200px" />
              <li className="resume-skills">MySQL & PostgreSQL</li>
              <ProgressBar percent={85} width="200px" />
              <li className="resume-skills">Docker</li>
              <ProgressBar percent={70} width="200px" />
            </ul>
          </Fieldset>
        </div>
      </Tab>
      
      <Tab title="Goals">
        <Fieldset legend="Professional Focus">
          <p>
            Passionate about writing clean, maintainable code and continuously 
            expanding knowledge in backend development, cloud tooling, and 
            distributed systems.
          </p>
        </Fieldset>
      </Tab>
    </Tabs>
  );
}

export default Resume;
