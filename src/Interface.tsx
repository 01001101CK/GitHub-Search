export interface GetRequestMember {
    url: string;
}

export interface MemberCardDetail {
    login: string;
    avatar_url: string;
    name?: string;
    location?: string;
    email?: string;
    public_repos: number;
}

export interface MemberData {
    id: number;
    login: string;
    avatar_url: string;
    name?: string;
    location?: string;
    email?: string;
    public_repos: number;
}

export interface Member {
    data: MemberData;
}
