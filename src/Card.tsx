import React, { useEffect, useState } from "react";
import axios from 'axios';
import styled from 'styled-components';
import { GetRequestMember, MemberCardDetail, MemberData, Member} from './Interface';

//styled-components 
const MemberCardContainer = styled.div`
  background-color: white;
  margin: 20px;
  max-width: 300px;
  position: relative;
  text-align: center;
  width: 300px;
  border-radius: 9px;
  box-shadow: 10px 6px 8px rgb(var(--color-bright));
`;

const Avatar = styled.img`
  width: 100%;
  border-radius: 9px;
  margin-bottom: 9px;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  width: 100px;
  margin: 16px;
  background: ${(props: { primary: boolean }) => props.primary ? "rgb(var(--color-bright))" : "rgb(var(--color-tint))"};
  color: ${(props: { primary: boolean }) => props.primary ? "rgb(var(--color-tint))" : "rgb(var(--color-dark))"};
  font-size: 20px;
`;

const StyledButton = styled.button``;


export default function Card() {

    const [eachMember, setEachmember] = useState<[] | any>([]);
    const [page, setPage] = useState<number>(1);
    //error state
    const [error, setError] = useState<string>('');
    const [current, setCurrent] = useState<[]>([]);


    useEffect(() => {
        axios.all([
            axios.get<GetRequestMember[]>(`https://api.github.com/users`)
                .then(res => {
                    //get data for all members 
                    const response1 = res.data;
                    //get detailed data for individual member 
                    axios.all(response1.map(member => axios.get(`${member.url}`)))
                        .then(
                            axios.spread((...res) => {
                                setEachmember(res);
                            })
                        )
                        .catch(err => setError(err.message));
                })
        ])
        //render 10 cards per page 
        setCurrent(eachMember.slice(0, 10))

    }, []);


    const MemberCard: React.FC<MemberCardDetail> = ({ login, avatar_url, name, location, email, public_repos }) => {
        return (
            <MemberCardContainer>
                <Avatar src={avatar_url} alt={`${login}'s avatar`} />
                <h1>{name}</h1>
                <span><strong>GitHub Profile:</strong></span> <a href={`https://github.com/users/${login}`} target="_blank">{login}</a>
                <h4>Location: {location}</h4>
                <h4>Email: {email}</h4>
                <h4>Public Repos: {public_repos}</h4>
            </MemberCardContainer>
        );
    };

    const handlePageChange = (increment: number) => {
        setPage(prevPage => prevPage + increment);
            const startIndex = (page - 1) * 10;
            const endIndex = startIndex + 10;
            //renders 10 new cards 
            setCurrent(eachMember.slice(startIndex, endIndex));
    };

    //conditional rendering if error states 
    return (
        <MainContainer>
            {error && <p>{error}</p>}
            {current.map((member: Member) => (
                <MemberCard
                    key={member.data.id}
                    login={member.data.login}
                    avatar_url={member.data.avatar_url}
                    name={member.data.name}
                    location={member.data.location}
                    email={member.data.email}
                    public_repos={member.data.public_repos}
                />
            ))}

            <Button as={StyledButton} onClick={() => handlePageChange(-1)} disabled={page === 1}>
                Prev
            </Button>
            <Button primary onClick={() => handlePageChange(1)}>
                Next
            </Button>
        </MainContainer>
    );
};