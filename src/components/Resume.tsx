import { Checkbox, Fieldset, ProgressBar, Tab, Tabs } from '@react95/core';

function Resume() {
  return (
    <Tabs defaultActiveTab="placeholder">
      <Tab title="placeholder">
        <h3>placeholder</h3>

        <p>text</p>
        <Fieldset legend="placeholder">
          <p>
            text
          </p>
        </Fieldset>
      </Tab>
      <Tab title="placeholder">
        <Fieldset legend="placeholder">
          <Checkbox readOnly checked>
            text
          </Checkbox>
          <Checkbox readOnly checked>
            text
          </Checkbox>
        </Fieldset>
        <Fieldset legend="placeholder">
          <Checkbox readOnly checked>
            text
          </Checkbox>
        </Fieldset>
        <Fieldset legend="placeholder">
          <Checkbox readOnly checked>
            text
          </Checkbox>
        </Fieldset>
        <Fieldset legend="placeholder">
          <Checkbox readOnly checked>
            text
          </Checkbox>
          <Checkbox readOnly checked>
            text
          </Checkbox>
        </Fieldset>
      </Tab>
      <Tab title="placeholder">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          <Fieldset legend="placeholder">
            <ul>
              <li className="resume-skills">text</li>
              <ProgressBar percent={98} width="200px" />
              <li className="resume-skills">text</li>
              <ProgressBar percent={95} width="200px" />
              <li className="resume-skills">text</li>
              <ProgressBar percent={97} width="200px" />
              <li className="resume-skills">text</li>
              <ProgressBar percent={96} width="200px" />
              <li className="resume-skills">text</li>
              <ProgressBar percent={90} width="200px" />
              <li className="resume-skills">text</li>
              <ProgressBar percent={80} width="200px" />
              <li className="resume-skills">text</li>
              <ProgressBar percent={78} width="200px" />
            </ul>
          </Fieldset>
          <Fieldset legend="placeholder">
            <ul>
              <li className="resume-skills">text</li>
              <ProgressBar percent={100} width="200px" />
              <li className="resume-skills">text</li>
              <ProgressBar percent={92} width="200px" />
              <li className="resume-skills">text</li>
              <ProgressBar percent={94} width="200px" />
              <li className="resume-skills">text</li>
              <ProgressBar percent={85} width="200px" />
            </ul>
          </Fieldset>
          <Fieldset legend="placeholder">
            <ul>
              <li className="resume-skills">text</li>
              <ProgressBar percent={99} width="200px" />
              <li className="resume-skills">text</li>
              <ProgressBar percent={88} width="200px" />
              <li className="resume-skills">text</li>
              <ProgressBar percent={75} width="200px" />
              <li className="resume-skills">text</li>
              <ProgressBar percent={70} width="200px" />
            </ul>
          </Fieldset>
        </div>
      </Tab>
      <Tab title="placeholder">
        <Fieldset legend="placeholder">
          <p>
            text
          </p>
        </Fieldset>
      </Tab>
    </Tabs>
  );
}

export default Resume;
