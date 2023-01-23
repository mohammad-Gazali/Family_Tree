import { gql } from "@apollo/client";

export const ALL_PERSON_QUERY = gql`
	query AllPersonQuery {
		queryPerson {
			id
			name
			work
			living_at
			address
			work1
			work1_address
			work2
			work2_address
			phone
			cell_phone
			work_phone
			national_id
			direct_children {
				id
			}
			area {
				id
				name
			}
		}
	}
`;

export const ONE_PERSON_QUERY = (id) => gql`
query OnePersonQuery {
  getPerson(id: "${id}") {
    name
    work
    living_at
    address
    work1
    work1_address
    work2
    work2_address
    phone
    cell_phone
    work_phone
    national_id
    direct_children {
        id
        name
    }
    area {
        id
        name
    }
  }
}
`;

export const ALL_AREA_QUERY = gql`
	query AllAreaQuery {
		queryArea {
			id
			name
		}
	}
`;
