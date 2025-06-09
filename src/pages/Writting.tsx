import WritingPractice from "../features/writingPractice";
import { withAuthProtection } from "../hoc/withAuthProtection";
import withEmailVerification from "../hoc/withEmailVerification";

function WritingPracticePage() {
  return (
    <WritingPractice />
  );
}

export default withAuthProtection(withEmailVerification(WritingPracticePage));
