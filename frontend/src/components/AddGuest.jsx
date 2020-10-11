import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { rgba } from "emotion-rgba";

// custom components:
import FormInput from "./inputs/FormInput";
import Button from "./buttons/Button";
import SelectSlider from "./inputs/SelectSlider";

const spacing = css`
  margin-bottom: 1rem;
`;

const AddGuestContainer = styled.form`
  background-color: ${({ theme }) => theme.colors.surface};
  width: 100%;

  color: ${({ theme }) => theme.colors.onBackground};
`;

const AddGuestButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;

  margin-top: 2.5rem;

  color: ${({ theme }) => theme.colors.onBackground};

  transition: height 200ms ease-out;

  &:hover {
    .btn-text {
      color: white;
    }
  }
`;

const INITIAL_GUEST = {
  name: "", // easy (completed)
  party: "", // hard (completed)
  phone: "", // hard
  table: "", // hard (completed)
  notes: "", // text area easy
  tableAssigned: "",
  reserveTime: "", // time that the guest reserves (use this variable to check if waitlist or reservation)
  waitTime: "", // time that the guest STARTS waiting (when the entry is confirmed)
  seatedTime: "", // time that the guest is seated
  departureTime: new Date(), // time that the guest finishes eating and leaves
};

const PARTY_ARRAY = [...Array(50).keys()];
const TABLE_ARRAY = (() => {
  const array = [];

  for (let i = 0; i < 25; i++) {
    const randomLetter = String.fromCharCode(
      Math.floor(Math.random() * (97 - 122) + 122)
    ).toUpperCase();

    const randomNum = Math.floor(Math.random() * (0 - 9) + 9);
    array.push(`${randomLetter}${randomNum}`);
  }

  return array;
})();

const AddGuest = React.forwardRef(({ handleChange, ...props }, ref) => {
  const [guest, setGuest] = useState(INITIAL_GUEST);

  useEffect(() => {
    console.log("rerendered");
  }, [guest.reserveTime]);

  return (
    <AddGuestContainer
      {...props}
      ref={ref}
      className="add-guest-container"
      onSubmit={(e) => {
        e.preventDefault();
        handleChange({
          ...guest,
          waitTime: new Date(),
          reserveTime: new Date(guest.reserveTime),
        });
        console.log("guest", guest);

        setGuest(INITIAL_GUEST);
        if (props.toggleDrawer) props.toggleDrawer();
      }}
      onClick={() => {}}
    >
      <FormInput
        required
        type="text"
        htmlFor="name"
        label="name"
        value={guest.name}
        handleChange={(e) => {
          setGuest({ ...guest, name: e.target.value });
        }}
        css={spacing}
      />

      <SelectSlider
        label="party size"
        options={PARTY_ARRAY}
        value={guest.party}
        handleChange={(val) => {
          setGuest({ ...guest, party: val });
        }}
        css={spacing}
      />

      <FormInput
        required
        type="tel"
        htmlFor="phone number"
        label="phone number"
        value={guest.phone}
        handleChange={(e) => {
          setGuest({ ...guest, phone: e.target.value });
        }}
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        css={spacing}
      />

      <FormInput
        type="text"
        htmlFor="notes"
        label="notes"
        value={guest.notes}
        handleChange={(e) => {
          setGuest({ ...guest, notes: e.target.value });
        }}
        css={spacing}
        additionalInfo="(optional)"
      />

      <FormInput
        type="datetime-local"
        htmlFor="reservation time"
        label="reservation"
        value={guest.reserveTime}
        handleChange={(e) => {
          setGuest({ ...guest, reserveTime: e.target.value });
        }}
        css={spacing}
        additionalInfo="(ignore if waitlist)"
      />

      {guest.reserveTime && (
        <SelectSlider
          label="seating"
          options={TABLE_ARRAY}
          value={guest.tableAssigned}
          handleChange={(val) => {
            setGuest({ ...guest, tableAssigned: val });
          }}
          // css={spacing}
        />
      )}

      <AddGuestButton text="confirm guest" />
    </AddGuestContainer>
  );
});

export default AddGuest;
