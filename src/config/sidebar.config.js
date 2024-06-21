import { DeleteOutlined, Inbox, InsertDriveFileOutlined, MailOutlined, Send, StarOutline } from "@mui/icons-material";
import { routes } from "../routes/routes";

export const SIDEBAR_DATA = [
    {
        name: 'inbox',
        title: 'Inbox',
        icon: Inbox,
        path: routes.emails.path
    },
    {
        name: 'starred',
        title: 'Starred',
        icon: StarOutline,
        path: routes.emails.path
    },
    {
        name: 'sent',
        title: 'Sent',
        icon: Send,
        path: routes.emails.path
    },
    {
        name: 'drafts',
        title: 'Drafts',
        icon: InsertDriveFileOutlined,
        path: routes.emails.path
    },
    {
        name: 'bin',
        title: 'Trash',
        icon: DeleteOutlined,
        path: routes.emails.path
    },
    {
        name: 'allmail',
        title: 'All Mail',
        icon: MailOutlined,
        path: routes.emails.path
    }
];