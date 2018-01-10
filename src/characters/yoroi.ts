namespace Arena.Characters {

    export class Yoroi extends character {

        constructor(order: number) {
            super(order);
            this.name = 'yoroi';
            this.display_name = 'Akadou Yoroi';
            this.description = 'The best character to be ever created.';
            this.skills_number = 4;

            this.skills_list.push(new skill(
                0,
                "yoroi",
                'Chidori',
                'Yoroi is the best.'
            ));
            this.skills_list.push(new skill(
                1,
                "yoroi",
                'Kirin',
                'No, seriously.'
            ));
            this.skills_list.push(new skill(
                2,
                "yoroi",
                'Sharingan',
                'You should respect him.'
            ));
            this.skills_list.push(new skill(
                3,
                "yoroi",
                'Vodovorot',
                'Oh my god he is so shitty...'
            ));
        }
    }
}