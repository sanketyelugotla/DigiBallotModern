import React from 'react'
import styleInstructions from "./instructions.module.css"

export default function Intructions() {
  return (
    <div className={styleInstructions.full}>
      <div className={styleInstructions.whole}>
        <div className={styleInstructions.field}>
          <h3 className={styleInstructions.h3}>Welcome to Indian Voting system.</h3>
          <p className={styleInstructions.p}>*Note: Please follow the Steps below to cast your vote securely and efficiently.</p>
        </div>
        <div className={styleInstructions.field}>
          <h3 className={styleInstructions.h3}>Step 1 : Select Your Constituency</h3>
          <ul className={styleInstructions.ul}>
            <li>On the Home Page, click the "Select Constituency" option.</li>
            <li>From the drop-down menu or search bar, select your registered constituency.</li>
            <li>From the drop-down menu or search bar, select your registered constituency.</li>
          </ul>
        </div>
        <div className={styleInstructions.field}>
          <h3 className={styleInstructions.h3}>Step 2: View Candidates</h3>
          <ul className={styleInstructions.ul}>
            <li>For each candidate, you will see:</li>
            <ul className={styleInstructions.ul}>
              <li>Candidate Name</li>
              <li>Party Name</li>
              <li>Party Symbol</li>
              <li>Key Promises ( Optional short desctiption )</li>
            </ul>
          </ul>
        </div>
        <div className={styleInstructions.field}>
          <h3 className={styleInstructions.h3}>Step 3: Select Your Candidate</h3>
          <ul className={styleInstructions.ul}>
            <li>Carefully review the candidates.</li>
            <li>Click the "Vote" button next to preferred candidate.</li>
          </ul>
        </div>
        <div className={styleInstructions.field}>
          <h3 className={styleInstructions.h3}>Step 4: Confirm Your Choice</h3>
          <ul className={styleInstructions.ul}>
            <li>A confirmation pop-up will appear, displaying the candidate and party you selected..</li>
            <li>You will see the following message:</li>
            <h4>"You have selected [Candidate Name] from [Party Name]. Do you confirm your vote?"</h4>
            <li>Click "Confirm" to finalise your vote or "GO Rack" to change your selection.</li>
          </ul>
        </div>
        <div className={styleInstructions.field}>
          <h3 className={styleInstructions.h3}>Step 5: Vote Acknowledgment</h3>
          <ul className={styleInstructions.ul}>
            <li>Once you confirm your vote, a message will be displayed:</li>
            <h4>"Thank you for voting! Your vote has been successfully recorded."</h4>
            <li>For your reference, you may receive an acknowledgment ID.</li>
          </ul>
        </div>
        <div className={styleInstructions.field}>
          <h3 className={styleInstructions.h3}>Step 6: Secure Exit</h3>
          <ul className={styleInstructions.ul}>
            <li>After voting, click "Return to Dashboard" or log out from the system.</li>
          </ul>
        </div>
        <div className={styleInstructions.banner}>Security Notes</div>
        <div className={styleInstructions.field}>
          <ul className={styleInstructions.ul}>
            <li>Your vote is confidential and secure.</li>
            <li>You can only vote once, so please make your selection carefully.</li>
            <li>Any tampering or misuse of the system is strictly prohibited and will result in legal action.</li>
          </ul>
        </div>
        <div className={styleInstructions.field}>
          <h3 className={styleInstructions.h3}>Need Assistance?</h3>
          <li>If you face any issues during the voting process, click on the Help button or contact the support team at [support email or phone number].</li>
        </div>
        <div className={styleInstructions.field}>
          <h4 className={styleInstructions.h4}>By following these instructions, you can ensure a smooth voting experience while contributing to a fair and democratic process.</h4>
        </div>
        <div className={`${styleInstructions.field} ${styleInstructions.check}`}>
          <label className={styleInstructions.container}>
            <input type="checkbox" />
            I have read all the instructions
          </label>
          <button>Confirm</button>
        </div>
      </div>
    </div>
  )
}
