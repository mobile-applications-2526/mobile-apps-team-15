import { Link, LinkProps } from "expo-router";
import React, { forwardRef } from "react";
import StyledButton from "@components/StyledButton";
import { View } from "react-native";

interface StyledLinkProps extends LinkProps {
    readonly children: React.ReactNode;
    readonly primary?: boolean;
}

const StyledLink = forwardRef<View, StyledLinkProps>((props, ref) => {
    return (
        <Link ref={ref} {...props} asChild>
            <StyledButton primary={props.primary}>
                {props.children}
            </StyledButton>
        </Link>
    );
});

export default StyledLink;
