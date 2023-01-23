import { gql } from "@apollo/client";

export const ADD_PERSON_MUTATION = gql`
	mutation AddPerson($input: [AddPersonInput!]!) {
		addPerson(input: $input) {
			person {
				id
			}
		}
	}
`;

export const UPDATE_PERSON_MUTATION = gql`
    mutation UpdatePerson($set: PersonPatch, $id: [ID!]) {
    updatePerson(input: {filter: {id: $id}, set: $set}) {
        person {
            id
        }
    }
}`

export const DELETE_PERSON_MUTATION = gql`
	mutation DeletePerson($id: [ID!]) {
		deletePerson(filter: {id: $id}) {
			msg
		}
	}
`