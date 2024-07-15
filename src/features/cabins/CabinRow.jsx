import styled from "styled-components";
import { HiSquare2Stack, HiPencil, HiTrash } from "react-icons/hi2";

import {formatCurrency} from "../../utils/helpers";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";

import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description
  } = cabin;

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description
    });
  }

  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Sleeps up to {maxCapacity}</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId}/>

            <Menus.List id={cabinId}>
              {/* duplicate cabin button */}
              <Menus.Button
                icon={<HiSquare2Stack />}
                onClick={handleDuplicate}
              >
                Duplicate
              </Menus.Button>

              {/* edit cabin button */}
              <Modal.Open opens="edit-cabin">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>


              {/* delete cabin button */}
              <Modal.Open opens="delete-cabin">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            {/* edit cabin modal */}
            <Modal.Window name="edit-cabin">
              <CreateCabinForm cabinToEdit={cabin}/>
            </Modal.Window>

            {/* delete cabin confirmation modal */}
            <Modal.Window name="delete-cabin">
              <ConfirmDelete
                resourceName="cabin"
                disabled={isDeleting}
                onConfirm={() => deleteCabin(cabinId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  )
}

export default CabinRow;
