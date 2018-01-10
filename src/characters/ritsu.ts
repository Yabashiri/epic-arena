namespace Arena.Characters {

    export class Ritsu extends character {

        constructor(order: number) {
            super(order);
            this.name = 'ritsu';
            this.display_name = 'Tainaka Ritsu';
            this.description = 'Self-appointed president of the Light Music Club, and the drummer of the band Ho-kago Tea Time.';
            this.skills_number = 4;

            this.skills_list.push(new skill(
                0,
                "ritsu",
                'Drums Release',
                'Ritsu unleashes her drumming skills, dealing more damage with every attack. Ritsu deals 20 physical damage to one enemy. This skill will deal 5 more physical damage every time it is used.'
            ));
            this.skills_list.push(new skill(
                1,
                "ritsu",
                'All Out',
                'Ritsu and her band perform a song together. Ritsu deals 35 reiatsu damage to one enemy and gains 1 random reiatsu. This skill will deal 5 more reiatsu damage every time it is used.'
            ));
            this.skills_list.push(new skill(
                2,
                "ritsu",
                'Final Song',
                'Ritsu performs her final song, \'No, Thank You!\'. For 3 turns, Ritsu\'s attacks will pierce and will deal 10 more damage. Ritsu will also gain 25 destructible defense that stacks. This skill cannot be used while active.'
            ));
            this.skills_list.push(new skill(
                3,
                "ritsu",
                'Sky High',
                'This skill makes Tainaka Ritsu invulnerable for 1 turn.'
            ));
        }
    }
}