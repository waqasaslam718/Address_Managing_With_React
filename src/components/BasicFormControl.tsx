import * as React from 'react';
import { FormControl, useFormControlContext } from '@mui/base/FormControl';
import { Input, inputClasses } from '@mui/base/Input';
import { styled } from '@mui/system';
import clsx from 'clsx';
import "./BasicFormControl.css";
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

interface BasicFormControlProps {
  handleClose: () => void;
}

export function BasicFormControl({ handleClose }: BasicFormControlProps) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [addresses, setAddresses] = React.useState(['']);

  const addAddress = () => {
    if (addresses.length < 3) {
      setAddresses([...addresses, '']);
    }
  };

  const handleAddressChange = (index: number, value: string) => {
    const newAddresses = [...addresses];
    newAddresses[index] = value;
    setAddresses(newAddresses);
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const newUser = {
      name,
      email,
      phone,
      addresses,
    };
  
    const existingUsers = JSON.parse(localStorage.getItem('userList') || '[]');
  
    const updatedUsers = [...existingUsers, newUser];
  
    localStorage.setItem('userList', JSON.stringify(updatedUsers));
  
  
  
    // Reset form
    setName('');
    setEmail('');
    setPhone('');
    setAddresses(['']);

    // Close modal
    handleClose();
  };

  return (
    <div className="overlay">
      <div className='modal-wrapper'>
        <CloseIcon
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            cursor: "pointer",
            color: "#555"
          }}
        />

        <FormWrapper onSubmit={handleSubmit}>
          <FormControl required>
            <Label>Name</Label>
            <StyledInput
              placeholder="Write your name here"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <HelperText />
          </FormControl>

          <FormControl required>
            <Label>Email</Label>
            <StyledInput
              type="email"
              placeholder="Write your email here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <HelperText />
          </FormControl>

          <FormControl required>
            <Label>Phone Number</Label>
            <StyledInput
              type="tel"
              placeholder="Write your phone number here"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <HelperText />
          </FormControl>

          {addresses.map((address, index) => (
            <FormControl
              key={index}
              required
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px',
              }}
            >
              <div style={{ flex: 1 }}>
                <Label>Address {index + 1}</Label>
                <StyledInput
                  placeholder="Write your address here"
                  value={address}
                  onChange={(e) => handleAddressChange(index, e.target.value)}
                />
                <HelperText />
              </div>

              {index === addresses.length - 1 && addresses.length < 3 && (
                <IconButton
                onClick={addAddress}
                aria-label="add address"
                sx={{
                  color: 'white',
                  backgroundColor: blue[500],
                  borderRadius: '20%',
                  width: '36px',
                  height: '36px',
                  position: 'relative', // Needed to move with top or margin
                  marginTop: '32px', // Moves the button downward
                  marginLeft: 'auto', // Pushes the button to the right inside a flex container
                  // display: 'block', // Works well with margin auto
                  '&:hover': {
                    backgroundColor: blue[600],
                  },
                  '&:active': {
                    transform: 'scale(0.95)',
                  },
                }}
              >
                <AddCircleIcon sx={{ fontSize: 24 }} />
              </IconButton>
              
              )}
            </FormControl>
          ))}

          <SubmitButton  type="submit">Submit</SubmitButton>
        </FormWrapper>
      </div>
    </div>      
  );
}

// Styled Components

const FormWrapper = styled('form')`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  gap: 20px;
`;

const StyledInput = styled(Input)(
  ({ theme }) => `
  .${inputClasses.input} {
    width: 320px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      outline: 0;
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }
  }
`
);

const Label = styled(
  ({ children, className }: { children?: React.ReactNode; className?: string }) => {
    const formControlContext = useFormControlContext();
    const [dirty, setDirty] = React.useState(false);

    React.useEffect(() => {
      if (formControlContext?.filled) {
        setDirty(true);
      }
    }, [formControlContext]);

    if (formControlContext === undefined) {
      return <p>{children}</p>;
    }

    const { error, required, filled } = formControlContext;
    const showRequiredError = dirty && required && !filled;

    return (
      <p className={clsx(className, error || showRequiredError ? 'invalid' : '')}>
        {children}
        {required ? ' *' : ''}
      </p>
    );
  },
)`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  margin-bottom: 4px;

  &.invalid {
    color: red;
  }
`;

const HelperText = styled((props: {}) => {
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return null;
  }

  const { required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return showRequiredError ? <p {...props}>This field is required.</p> : null;
})`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
`;

const SubmitButton = styled('button')`
  background-color: ${blue[500]};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  font-family: 'IBM Plex Sans', sans-serif;
  margin-top: 10px;

  &:hover {
    background-color: ${grey[400]};
  }
`;
