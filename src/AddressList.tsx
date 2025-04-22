import React, { useEffect, useState } from 'react';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  List,
  ListItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export const AddressList = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('userList') || '[]');
    setUsers(savedUsers);
  }, [users]);

  const handleEdit = (index: number) => {
    setSelectedUser({ ...users[index] });
    setEditIndex(index);
    setIsEditMode(true);  
    setOpen(true);
  };

  const handleDelete = (index: number) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
    localStorage.setItem('userList', JSON.stringify(updatedUsers));
  };

  const handleView = (user: any) => {
    setSelectedUser(user);
    setIsEditMode(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
    setIsEditMode(false);
    setEditIndex(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedUser((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedAddresses = [...selectedUser.addresses];
    updatedAddresses[index] = e.target.value;
    setSelectedUser((prev: any) => ({
      ...prev,
      addresses: updatedAddresses,
    }));
  };

  const handleAddAddress = () => {
    if (selectedUser.addresses.length < 3) {
      setSelectedUser((prev: any) => ({
        ...prev,
        addresses: [...prev.addresses, ''],
      }));
    }
  };

  const handleRemoveAddress = (index: number) => {
    const updatedAddresses = [...selectedUser.addresses];
    updatedAddresses.splice(index, 1);
    setSelectedUser((prev: any) => ({
      ...prev,
      addresses: updatedAddresses,
    }));
  };

  const handleSave = () => {
    if (editIndex !== null) {
      const updatedUsers = [...users];
      updatedUsers[editIndex] = selectedUser;
      setUsers(updatedUsers);
      localStorage.setItem('userList', JSON.stringify(updatedUsers));
    }
    handleClose();
  };

  if (users.length === 0) {
    return <Typography align="center" mt={5}> No users yet.</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        User List
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="address table">
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Phone</strong></TableCell>
              <TableCell><strong>Addresses</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  <List dense>
                    {user.addresses.map((addr: string, i: number) => (
                      <ListItem key={i}>{addr}</ListItem>
                    ))}
                  </List>
                </TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => handleView(user)}>
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton color="success" onClick={() => handleEdit(index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(index)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for View/Edit */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{isEditMode ? 'Edit User' : 'User Details'}</DialogTitle>
        <DialogContent dividers>
          {selectedUser && (
            <>
              {isEditMode ? (
                <>
                  <TextField
                    fullWidth
                    margin="dense"
                    label="Name"
                    name="name"
                    value={selectedUser.name}
                    onChange={handleInputChange}
                  />
                  <TextField
                    fullWidth
                    margin="dense"
                    label="Email"
                    name="email"
                    value={selectedUser.email}
                    onChange={handleInputChange}
                  />
                  <TextField
                    fullWidth
                    margin="dense"
                    label="Phone"
                    name="phone"
                    value={selectedUser.phone}
                    onChange={handleInputChange}
                  />
                  <Typography sx={{ mt: 2, mb: 1 }}><strong>Addresses:</strong></Typography>
                  {selectedUser.addresses.map((addr: string, index: number) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <TextField
                        fullWidth
                        margin="dense"
                        label={`Address ${index + 1}`}
                        value={addr}
                        onChange={(e) => handleAddressChange(e, index)}
                      />
                      <IconButton onClick={() => handleRemoveAddress(index)} disabled={selectedUser.addresses.length <= 1}>
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    </div>
                  ))}
                  <Button
                    variant="outlined"
                    sx={{ mt: 1 }}
                    onClick={handleAddAddress}
                    disabled={selectedUser.addresses.length >= 3}
                  >
                    + Add Address
                  </Button>
                </>
              ) : (
                <>
                  <Typography><strong>Name:</strong> {selectedUser.name}</Typography>
                  <Typography><strong>Email:</strong> {selectedUser.email}</Typography>
                  <Typography><strong>Phone:</strong> {selectedUser.phone}</Typography>
                  <Typography sx={{ mt: 2 }}><strong>Addresses:</strong></Typography>
                  <List dense>
                    {selectedUser.addresses.map((addr: string, index: number) => (
                      <ListItem key={index}>{addr}</ListItem>
                    ))}
                  </List>
                </>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          {isEditMode ? (
           <>

          <Button onClick={handleClose}>Cancel</Button>

            <Button onClick={handleSave} variant="contained" color="primary">
              Save
            </Button>
           
          </>
          ) 
          : (
            <Button onClick={handleClose} variant="contained" color="primary">
              Close
            </Button>
          )
        }
        </DialogActions>
      </Dialog>
    </Container>
  );
};
