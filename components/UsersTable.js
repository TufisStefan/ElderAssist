import { DataTable, IconButton, TextInput } from "react-native-paper"
import CommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcons from 'react-native-vector-icons/AntDesign';
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import UserService from '../services/user.service';
import AlertDialog from "./AlertDialog";
import TopBar from "./TopBar";

const UsersTable = () => {
    const [responseContent, setResponseContent] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [editableUser, setEditableUser] = useState({});
    const [editable, setEditable] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [alertVisible, setAlertVisible] = useState(false);

    const from = page * rowsPerPage;
    const to = Math.min((page + 1) * rowsPerPage, responseContent.totalElements);

    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (value) => {
        console.log(value);
        setRowsPerPage(parseInt(value, 10));
        setPage(0);
    };

    const handleDelete = async () => {
        await UserService.deleteUser(username).then((response) => {
            getUsers();
        }, (error) => {
            setErrorMessage(error.response.data);
            setAlertVisible(true);
        });
        setDialogOpen(false);
        setPage(0);
        getUsers();
    }

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleUpdate = async () => {
        await UserService.updateUser(editableUser.id, editableUser).then((response) => {
            getUsers();
        },
            (error) => {
                setErrorMessage(error.response.data);
                setAlertVisible(true);
            });
    }

    const handleSave = () => {
        setEditableUser({});
        setEditable(false);
        handleUpdate();
    }

    const handleChangeUsername = (e) => {
        setEditableUser(editableUser => ({
            ...editableUser,
            username: e.target.value
        }));
    }
    const handleChangeEmail = (e) => {
        setEditableUser(editableUser => ({
            ...editableUser,
            email: e.target.value
        }))
    }
    const getUsers = () => {
        UserService.getAdminBoard(page, rowsPerPage).then((response) => {
            setResponseContent(response.data);
            setHasLoaded(true);
        },
            (error) => {
                const _content = error.message || error.toString();
                setResponseContent(_content);
                if (error.response && error.status === 401) {
                    eventBus.dispatch("logout");
                }
            });
    }
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, responseContent.totalElements - page * rowsPerPage);

    useEffect(() => {
        getUsers();
    }, [page, rowsPerPage]);

    return (
        <View style={{ flex: 1, }}>
            <TopBar title="Admin Page" />
            <Text variant="titleLarge"
                style={{
                    fontFamily: 'Roboto',
                    fontSize: 28,
                    fontWeight: '500',
                    color: '#333',
                    marginVertical: 20,
                    alignSelf: 'center'
                }}>
                Users
            </Text>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>ID</DataTable.Title>
                    <DataTable.Title>Username</DataTable.Title>
                    <DataTable.Title>Email</DataTable.Title>
                    <DataTable.Title>Roles</DataTable.Title>
                    <DataTable.Title></DataTable.Title>
                    {/* <DataTable.Title></DataTable.Title> */}
                </DataTable.Header>
                {
                    hasLoaded && responseContent.content.map((row) => (
                        <DataTable.Row key={row.id}>
                            <DataTable.Cell>
                                {row.id}
                            </DataTable.Cell>
                            <DataTable.Cell>
                                {(row.id === editableUser.id && editable) ? (
                                    <TextInput
                                        mode="flat"
                                        value={editableUser.username}
                                        onChange={handleChangeUsername}
                                    />
                                ) : (
                                    row.username
                                )}
                            </DataTable.Cell>
                            <DataTable.Cell>
                                {(row.id === editableUser.id && editable) ? (
                                    <TextInput
                                        mode="flat"
                                        value={editableUser.email}
                                        onChange={() => handleChangeEmail}
                                    />
                                ) : (
                                    row.email
                                )}
                            </DataTable.Cell>
                            <DataTable.Cell>{row.roles.map(role => role.name).sort()[0]}</DataTable.Cell>
                            <DataTable.Cell>
                                <IconButton
                                    icon='delete'
                                    size={20}
                                    onPress={() => { setUsername(row.username); handleOpenDialog(); }}
                                />
                            </DataTable.Cell>
                        </DataTable.Row>
                    ))
                }
                {emptyRows > 0 && (
                    <DataTable.Row style={{ height: 50 * emptyRows }}>
                        <DataTable.Cell colSpan={5} />
                    </DataTable.Row>
                )}
                <AlertDialog
                    handleCloseDialog={handleCloseDialog}
                    dialogTitle={"Confirm user delete"}
                    dialogText={"Are you sure you want to delete this user?"}
                    handleDelete={handleDelete}
                    open={dialogOpen}
                />
                <DataTable.Pagination
                    page={page}
                    numberOfPages={responseContent.totalPages}
                    onPageChange={(page) => handleChangePage(page)}
                    numberOfItemsPerPageList={[5, 10]}
                    numberOfItemsPerPage={rowsPerPage}
                    label={`${from + 1}-${to} of ${responseContent.totalElements}`}
                    onItemsPerPageChange={handleChangeRowsPerPage}
                    showFastPaginationControls
                    selectPageDropdownLabel={'Rows per page'}
                />
            </DataTable>
        </View>
    );
}

export default UsersTable;