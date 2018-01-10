namespace Arena.Characters {

    export class Hiyori extends character {

        constructor(order: number) {
            super(order);
            this.name = 'hiyori';
            this.display_name = 'Sarugaki Hiyori';
            this.description = 'The former lieutenant of the 12th Division, Hiyori is a short-tempered, festering girl with very violent tendencies.';
            this.skills_number = 4;

            this.skills_list.push(new skill(
                0,
                "hiyori",
                'Flying Kick',
                'Hiyori kicks the shit out of the enemy.'
            ));
            this.skills_list.push(new skill(
                1,
                "hiyori",
                'Serpent Strike',
                'Hiyori unleashes her shikai, Kubikiri Orochi.'
            ));
            this.skills_list.push(new skill(
                2,
                "hiyori",
                'Sweeping Cero',
                'Hiyori unleashes a powerful cero.'
            ));
            this.skills_list.push(new skill(
                3,
                "hiyori",
                'Serpent Parry',
                'Hiyori parries one enemy\'s attack.'
            ));
        }
    }
}