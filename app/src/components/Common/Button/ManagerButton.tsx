import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import {useState} from "react";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";

export interface ManagerButtonProps {
    content: ReactJSXElement
}

const ManagerButton = (props: ManagerButtonProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    // @ts-ignore
    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const isOpen = () => {
        return open;
    }

    return (
        <>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={isOpen() ? 'long-menu' : undefined}
                aria-expanded={isOpen() ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon/>
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={isOpen()}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: 48 * 6,
                        width: '30ch',
                    },
                }}
            >
                {props.content}
            </Menu>
        </>
    )
}

export default ManagerButton;
