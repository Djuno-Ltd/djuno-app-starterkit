export interface Contact {
  Id: number;
  ContactDetail: string;
  IsCurrentUser: boolean;
}

export type ContactsStateType = {
  contacts: Array<Contact> | [];
  selectedContact: Contact | null;
  showContactsModal: boolean;
  loading: boolean;
};

export type ContactsCreateDataType = {
  Name: string;
  Email: string;
};
