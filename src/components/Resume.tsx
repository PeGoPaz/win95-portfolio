import { Checkbox, Fieldset, ProgressBar, Tab, Tabs } from '@react95/core';

function Resume() {
  return (
    <Tabs defaultActiveTab="Profile">
      <Tab title="Profile">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '4px' }}>
          <Fieldset legend="Summary">
            <h3 style={{ marginBottom: '8px' }}>Software Developer</h3>
            <p>
              Software developer with experience in Java, SQL, and modern web technologies, 
              focused on building reliable backend systems and data-driven applications.
            </p>
          </Fieldset>

          <Fieldset legend="Experience">
            <p>
              Experienced working with banking software and large reporting systems, 
              including validating and modifying hundreds of database-driven reports. 
              Comfortable working with Linux environments, Git workflows, and modern 
              development tools.
            </p>
          </Fieldset>

          <Fieldset legend="Certificates & Education">
             <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Checkbox readOnly checked>
                  IELTS Academic | December 2021
                </Checkbox>
                <Checkbox readOnly checked>
                  “Junior Java Developer” from SkyPro | Mar 2022 – Feb 2023
                </Checkbox>
                <p style={{ margin: "4px 0 0 24px" }}>
                  <a href="https://sky.pro/courses/programming/javadeveloper#giftpopup" target="_blank" rel="noreferrer" style={{ color: "blue" }}>
                    View Course Details
                  </a>
                </p>
             </div>
          </Fieldset>
          
          <Fieldset legend="Goals">
            <p>
              Passionate about writing clean, maintainable code and continuously 
              expanding knowledge in backend development, cloud tooling, and 
              distributed systems.
            </p>
          </Fieldset>
        </div>
      </Tab>
      
      <Tab title="Technical Skills">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', padding: '4px' }}>
          <Fieldset legend="Programming" style={{ flex: '1 1 200px' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '4px' }}>Java</li>
              <ProgressBar percent={95} width="100%" />
              <li style={{ marginTop: '12px', marginBottom: '4px' }}>SQL</li>
              <ProgressBar percent={90} width="100%" />
              <li style={{ marginTop: '12px', marginBottom: '4px' }}>JavaScript</li>
              <ProgressBar percent={85} width="100%" />
              <li style={{ marginTop: '12px', marginBottom: '4px' }}>Python</li>
              <ProgressBar percent={75} width="100%" />
            </ul>
          </Fieldset>
          
          <Fieldset legend="Backend & Web" style={{ flex: '1 1 200px' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '4px' }}>REST APIs</li>
              <ProgressBar percent={90} width="100%" />
              <li style={{ marginTop: '12px', marginBottom: '4px' }}>Node.js</li>
              <ProgressBar percent={85} width="100%" />
              <li style={{ marginTop: '12px', marginBottom: '4px' }}>React / Next.js</li>
              <ProgressBar percent={80} width="100%" />
              <li style={{ marginTop: '12px', marginBottom: '4px' }}>HTML & CSS</li>
              <ProgressBar percent={85} width="100%" />
            </ul>
          </Fieldset>
          
          <Fieldset legend="Databases & Tools" style={{ flex: '1 1 200px' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '4px' }}>Git & npm</li>
              <ProgressBar percent={95} width="100%" />
              <li style={{ marginTop: '12px', marginBottom: '4px' }}>Linux & Bash</li>
              <ProgressBar percent={85} width="100%" />
              <li style={{ marginTop: '12px', marginBottom: '4px' }}>MySQL & PostgreSQL</li>
              <ProgressBar percent={85} width="100%" />
              <li style={{ marginTop: '12px', marginBottom: '4px' }}>Docker</li>
              <ProgressBar percent={70} width="100%" />
            </ul>
          </Fieldset>
        </div>
      </Tab>
    </Tabs>
  );
}

export default Resume;
