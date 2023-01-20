export const orgChart = {
	name: "Family",
	children: [
		{
			name: "Manager",
			attributes: {
				work: "Programmer",
                home: "5th Street",
			},
			children: [
				{
					name: "Foreman",
					attributes: {
						department: "Fabrication",
					},
					children: [
						{
							name: "Worker",
						},
					],
				},
				{
					name: "Foreman",
					attributes: {
						department: "Assembly",
					},
					children: [
						{
							name: "Worker",
						},
					],
				},
			],
		},
	],
};
