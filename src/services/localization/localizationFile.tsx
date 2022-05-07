import { englishHeader, russianHeader } from '../../components/header/headerLoc';
import { englishLogIn, russianLogIn } from '../../feature/logIn/logInLoc';
import { englishMain, russianMain } from '../../feature/main/mainLoc';
import { englishProfile, russianProfile } from '../../feature/profile/profileLoc';
import { englishSignUp, russianSignUp } from '../../feature/signUp/signUpLoc';

const localizationFile = {
  Russian: {
    header: russianHeader,
    main: russianMain,
    profile: russianProfile,
    logIn: russianLogIn,
    signUp: russianSignUp,
  },
  English: {
    header: englishHeader,
    main: englishMain,
    profile: englishProfile,
    logIn: englishLogIn,
    signUp: englishSignUp,
  },
};

export default localizationFile;
