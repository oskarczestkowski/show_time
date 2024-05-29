interface User {
    avatar: string;
    created: string;
    emailVisibility: boolean;
    id: string;
    instagram_url: string;
    name: string;
    role: string;
    soundcloud_url: string;
    updated: string;
    username: string;
    verified: boolean;
    youtube_url: string;
}

interface Event {
    created: string;
    date: string;
    id: string;
    name: string;
    place_id: string;
    updated: string;
}

interface Place {
    address: string;
    created: string;
    id: string;
    name: string;
    owner_id: string;
    updated: string;
}
