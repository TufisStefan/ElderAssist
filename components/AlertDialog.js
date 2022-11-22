import * as React from 'react';
import { Button, Paragraph, Dialog, Portal, Provider } from 'react-native-paper';
export default function AlertDialog(props) {

    return (
        <Portal>
            <Dialog
                visible={props.open}
                onDismiss={props.handleCloseDialog}
            >
                <Dialog.Title>
                    {props.dialogTitle}
                </Dialog.Title>
                <Dialog.Content>
                    <Paragraph>
                        {props.dialogText}
                    </Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={props.handleCloseDialog}>Cancel</Button>
                    <Button onPress={props.handleDelete} autoFocus>
                        Confirm
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}