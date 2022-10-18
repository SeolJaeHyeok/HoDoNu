import FreeBreakfastOutlinedIcon from '@mui/icons-material/FreeBreakfastOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import VaccinesOutlinedIcon from '@mui/icons-material/VaccinesOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import AccessibilityNewOutlinedIcon from '@mui/icons-material/AccessibilityNewOutlined';

export const SideBarPath: any = {
  '회원 관리': '/managament/user',
  '게시판 관리': '/managament/board',
  '채용 관리': '/management/recruit',
  '자유 게시판': '/board/free',
  '의사 게시판': '/board/doctor',
  '간호사 게시판': '/board/nurse',
  '개인정보 수정': '/mypage/edit',
  '내 게시글': '/mypage/articles',
};

export const boardSideBarMenus: string[] = ['자유 게시판', '간호사 게시판', '의사 게시판'];

export const adminSideBarMenus: string[] = ['회원 관리', '게시판 관리', '채용 관리'];

export const userSideBarMenus: string[] = ['개인정보 수정', '내 게시글'];

export const SIDE_BAR_ICONS: any = {
  '회원 관리': <ManageAccountsOutlinedIcon />,
  '게시판 관리': <AssignmentOutlinedIcon />,
  '채용 관리': <AccessibilityNewOutlinedIcon />,
  '자유 게시판': <FreeBreakfastOutlinedIcon />,
  '의사 게시판': <LocalHospitalOutlinedIcon />,
  '간호사 게시판': <VaccinesOutlinedIcon />,
  '개인정보 수정': <ManageAccountsOutlinedIcon />,
  '내 게시글': <AssignmentOutlinedIcon />,
};
