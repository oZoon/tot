import React, { useState } from "react";

import Button from 'so-simple/button';
import Text from 'so-simple/text';
import Input from 'so-simple/inputPassword';

export default props => {
    const [password, setPassword] = useState('');

    const pressKey = e => {
        e.key == 'Enter' ? props.onUserLogIn({ data: { password } }) : setPassword(e.target.value);
    }
    const pressButton = () => {
        props.onUserLogIn({ data: { password } });
    }

    return (
        <div className="auth">
            <div className="auth-modal">
                <div className="auth-container">
                    <Text {...props.propsText} />
                    <div>
                        <Input pressKey={pressKey} />
                        <Button
                            {...props.propsButton}
                            pressButton={pressButton}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
