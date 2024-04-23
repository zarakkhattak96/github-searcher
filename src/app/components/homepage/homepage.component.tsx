import { IHomePageComponentProps } from '../../../utils/interfaces.utils';
import { SearchInputComponent } from '../common/searchInput/searchInput';
import { SelectCommonComponent } from '../common/select/select.common';
import { ContentComponent } from '../content/content.component';
import NavBar from '../navbar/navbar.component';
import { ThemeSwitcher } from '../theme-switcher/theme-switcher.component';

export const HomePageComponent: React.FC<IHomePageComponentProps> = ({
  username,
  setUsername,
  debouncedProfile,
  userProfile,
  isRepoExpanded,
  setIsRepoExpanded,
  expandedUserRepos,
  setExpandedUserRepos,
  activeColor,
  setActiveColor,
}) => {
  return (
    <>
      <NavBar />
      <ThemeSwitcher />
      <SearchInputComponent username={username} setUsername={setUsername} />
      <SelectCommonComponent debouncedProfile={debouncedProfile} />
      <ContentComponent
        userProfile={userProfile}
        isRepoExpanded={isRepoExpanded}
        setIsRepoExpanded={setIsRepoExpanded}
        expandedUserRepos={expandedUserRepos}
        setExpandedUserRepos={setExpandedUserRepos}
        activeColor={activeColor}
        setActiveColor={setActiveColor}
      />
    </>
  );
};
