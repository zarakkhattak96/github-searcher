import { Anchor, Card, Col, Row, Typography, Flex, Avatar } from "antd";
import Meta from "antd/es/card/Meta";
import type { IContentComponentProps } from "../../../utils/interfaces";
import type React from "react";
import { useEffect } from "react";
import { useStyle } from "../../../styles/style";

const { Title } = Typography;

export const ContentComponent: React.FC<IContentComponentProps> = ({
	userProfile,
	userRepositories,
}) => {
	const { styles } = useStyle();

	return (
		<>
			<Flex className={styles.cards} id="userProf-list">
				{userProfile?.length > 0 && (
					<Row gutter={[36, 18]}>
						{userProfile?.map((profile, index) => (
							<Col key={index}>
								{profile.login !== undefined && (
									<Card
										hoverable
										cover={
											<Avatar
												size={100}
												alt="user dp"
												src={profile.avatar_url}
												className={styles.profileAvatar}
											/>
										}
										className={styles.profileCard}
									>
										<Meta
											description={
												<Anchor
													items={[
														{
															key: "profile_url",
															href: profile.html_url,
															title: "Github Account",
														},
													]}
												/>
											}
										/>

										<div>
											<Title level={5}> {profile.login}</Title>
											<Meta
												description={
													<Anchor
														items={[
															{
																key: "Profile",
																href: profile.html_url,
																title: "Profile",
															},
														]}
													/>
												}
											/>
										</div>
									</Card>
								)}
							</Col>
						))}
					</Row>
				)}
			</Flex>

			<Flex className={styles.cards} id="repoCards">
				{userRepositories.length > 0 && (
					<Row gutter={[36, 18]}>
						{userRepositories?.map((repo, index) => (
							<Col key={index}>
								{repo.name !== undefined && (
									<Card
										hoverable
										className={styles.reposCard}
										title={repo.name}
									>
										<Meta
											description={
												<Anchor
													items={[
														{
															key: "repo_url",
															href: repo.html_url,
															title: repo.name,
														},
													]}
												/>
											}
										/>
										<div>
											<Title level={5}>Stars: {repo.stargazers_count}</Title>
											<Title level={5}>Forks: {repo.forks_count}</Title>
											<Title level={5}> Author: {repo.owner?.login} </Title>
										</div>
									</Card>
								)}
							</Col>
						))}
					</Row>
				)}
			</Flex>
		</>
	);
};
