import { Link } from "expo-router";
import React from "react";
import StyledButton from "@components/StyledButton";

type StyledLinkProps = {
    href: string;
    label: string;
    children: React.ReactNode;
    primary?: boolean;
}

export default function StyledLink({href, label, children, primary}: Readonly<StyledLinkProps>) {
    return (
        <Link href={href} aria-label={label} asChild>
            <StyledButton primary={primary}>
                {children}
            </StyledButton>
        </Link>
    );
}