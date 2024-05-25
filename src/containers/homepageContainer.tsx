import { Flex, message } from "antd";
import { useEffect, useState } from "react";
import type {
	IRepository,
	IUserProfile,
	SelectedOptionType,
} from "../utils/interfaces";
import { fetchUserProfiles } from "../redux/thunk/fetchUserThunk";
import { fetchUserRepos } from "../redux/thunk/fetchReposThunk";
import { HomePageLayout } from "../app/components/homepage/homepageLayout";
import { ThemeContext } from "../context/themeContext";
import { ThemeProvider } from "antd-style";
import { useStyle } from "../styles/style";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useDebounce } from "../hooks/debounce";
import type { AppDispatch, RootState } from "../redux/store/store";
import { clearReposData, clearUserData } from "../redux/slice";

const App = () => {
	const paginationInitialValues = {
		page: 1,
		per_page: 20,
		total_count: 0,
	};

	const [pagination, setPagination] = useState(paginationInitialValues);
	const [username, setUsername] = useState("");
	const [page, setPage] = useState(1);
	const [userProfiles, setUserProfile] = useState<IUserProfile[]>([]);
	const [searchQuery, setSearchQuery] = useState("");

	const [userRepositories, setUserRepos] = useState<IRepository[]>([]);
	const [selectedOption, setSelectedOption] =
		useState<SelectedOptionType>("user");
	const [isLoading, setIsloading] = useState<boolean>(false);
	const [theme, setTheme] = useState<"light" | "dark">("light");
	const navigate = useNavigate();
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);

	const userName = queryParams.get("q") || "";
	const { styles } = useStyle();

	const dispatch = useDispatch();

	const userProfileState = useSelector((state: RootState) => state.profile);
	const reposState = useSelector((state: RootState) => state.repos);

	const fetchProfileData = async (
		query: string,
		perPage: number,
		page: number,
	) => {
		try {
			const resultAction = dispatch<AppDispatch | any>(
				fetchUserProfiles({
					query,
					perPage,
					page,
				}),
			);

			if (fetchUserProfiles.fulfilled.match(resultAction)) {
				setIsloading(false);

				return resultAction;
			}
			if (fetchUserProfiles.rejected.match(resultAction)) {
				setIsloading(true);

				message.error("Cannot fetch User Profile");
				return;
			}
			setIsloading(true);

			return await resultAction;
		} catch (error) {
			console.error("Error fetching data:", error);
			setIsloading(false);
		}
	};

	const fetchReposData = async (
		query: string,
		perPage?: number,
		page?: number,
	) => {
		try {
			const resultAction = dispatch<AppDispatch | any>(
				fetchUserRepos({ query, perPage, page }),
			);

			if (fetchUserRepos.fulfilled.match(resultAction)) {
				// const reposAction = resultAction;

				setIsloading(false);

				return resultAction;
			}
			if (fetchUserRepos.rejected.match(resultAction)) {
				setIsloading(true);

				message.error("Cannot fetch repos");
				return;
			}
			setIsloading(true);

			setIsloading(true);

			setIsloading(false);

			return await resultAction;
		} catch (error) {
			console.error("Error fetching data:", error);

			setIsloading(false);
		}
	};

	const search = async () => {
		if (username.length === 0 || username.length < 3) {
			setIsloading(false);

			return;
		}

		setIsloading(true);

		if (selectedOption === "user") {
			await fetchProfileData(username, pagination.per_page, pagination.page);

			if (userProfileState && userProfileState.userProfiles.items.length > 0) {
				setUserProfile((prevUserProfile) => [
					...prevUserProfile,
					...userProfileState.userProfiles.items,
				]);

				setPagination((pagination) => ({ ...pagination }));
				setIsloading(false);
			} else if (userProfileState.userProfiles.items.length === 0) {
				setPagination((pagination) => ({
					...pagination,
					total_count: userProfiles.length,
				}));
			}

			// const result = userProfileState.userProfiles;

			// if (result) {
			// 	const items = result.items;
			// 	setUserProfile(items);

			// 	const total_count = result.total_count;

			// 	setPagination((pagination) => ({
			// 		...pagination,
			// 	}));

			// const followersData = await Promise.all(
			//   items.map(async (user: IUserProfile) => {
			//     return { ...user };
			//   }),
			// );

			// setUserProfile([
			//   ...followersData,
			//   ...userProfileState.userProfiles.items,
			// ]);

			// setUserProfile((prevUserProfiles) => {
			//   const updatedProfiles = followersData.map(
			//     (userWithFollowers: IUserProfile) => ({
			//       ...userWithFollowers,
			//       followers: userWithFollowers.followers,
			//     }),
			//   );

			//   return [...prevUserProfiles, ...updatedProfiles];
			// });
			// dispatch(changeUserProfile(items));
			// setSearchedUsers([...searchedUsers, username]);
			// reposState.userRepos.items = [];
			// }
		} else if (selectedOption === "repos") {
			await fetchReposData(username, pagination.per_page, pagination.page);

			if (reposState && reposState.userRepos.items.length > 0) {
				setUserRepos((prevUserRepos) => [
					...prevUserRepos,
					...reposState.userRepos.items,
				]);

				setPagination((pagination) => ({ ...pagination }));

				setIsloading(false);
			} else if (reposState.userRepos.items.length === 0) {
				setPagination((pagination) => ({
					...pagination,
					total_count: userRepositories.length,
				}));
			}

			setUserProfile([]);
		}
	};

	const debouncedProfileSearch = useDebounce((val: string) => {
		search();
		setUsername(val);
	}, 1000);

	const handleChange = (v: SelectedOptionType) => {
		if (v === "user") {
			dispatch(clearReposData());
		} else if (v === "repos") {
			dispatch(clearUserData());
		}

		if (username.length >= 3) {
			setUsername("");
		}

		setPagination(paginationInitialValues);
		setIsloading(false);
	};

	useEffect(() => {
		if (searchQuery.length < 3) {
			setSearchQuery("");
		}
	});

	const handleScroll = () => {
		setPagination((pagination) => ({
			...pagination,
			page: pagination.page + 1,
		}));
		setPage((page) => page + 1);
	};

	const conditionForBottomScroll =
		(pagination.total_count !== userProfileState.userProfiles.items.length &&
			userProfileState.userProfiles.items.length !== 0) ||
		(pagination.total_count !== reposState.userRepos.items.length &&
			reposState.userRepos.items.length !== 0);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		debouncedProfileSearch(username);
	}, [username, pagination.page]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {}, [pagination]);

	useEffect(() => {
		const newUrl = `${location.pathname}?q=${encodeURIComponent(userName)}`;
		navigate(newUrl);
	}, [userName, navigate, location.pathname]);

	useEffect(() => {
		userName && setUsername(decodeURI(userName));
	}, [userName]);

	return (
		<Flex id="homeContainer" className={styles.flexHeight}>
			<ThemeProvider appearance={theme}>
				<ThemeContext.Provider
					value={{
						changeTheme: () => {
							setTheme((curr) => (curr === "dark" ? "light" : "dark"));
						},
					}}
				>
					<HomePageLayout
						username={username}
						setUsername={setUsername}
						userProfile={userProfileState.userProfiles.items}
						userRepositories={reposState.userRepos.items}
						setExpandedUserRepos={setUserRepos}
						handleChange={handleChange}
						handleInputChange={debouncedProfileSearch}
						selectedOption={selectedOption}
						setSelectedOption={setSelectedOption}
						isLoading={isLoading}
						setIsLoading={setIsloading}
						handleScroll={handleScroll}
						conditionForBottomScroll={conditionForBottomScroll}
						setPage={setPage}
						page={page}
					/>
				</ThemeContext.Provider>
			</ThemeProvider>
		</Flex>
	);
};

export default App;
