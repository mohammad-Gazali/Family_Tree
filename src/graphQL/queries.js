import { gql } from "@apollo/client";


const Common = `id
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
		birthdate
		area {
			id
			name
		}
		father {
			id
			name
		}
`

function dealWithDepth(depth) {
	
	if (depth <= 1) return ``

	let result = ``
	
	for (let i = 1; i < depth; i++) {
		result += `direct_children {
			${Common}
		`
	}
	
	result += `}`.repeat(depth - 1)
	
	return result
}

export const ALL_PERSON_QUERY = (depth) => gql`
	query AllPersonQuery {
		queryPerson(filter: {has: high}) {
			${Common}
			${dealWithDepth(depth)}
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

export const ALL_PERSON_NAMES_IDS_DEPTH_CHILDSiDS_BIRTHDATE_QUERY = gql`
	query AllPeopleNamesIDs {
		queryPerson {
			id
			name
			depth
			birthdate
			direct_children {
				id
			}
		}
	}
`

export const MAX_DEPTH_QUERY = gql`
	query MaxDepthPerson {
		aggregatePerson {
			depthMax
		}
  	}
`

