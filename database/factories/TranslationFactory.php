<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Translation;
use Faker\Generator as Faker;

$factory->define(Translation::class, function (Faker $faker) {
    return [
        'name' => $slug = $faker->company,
        'description' => $faker->paragraph,
        'term_id' => function () {
            return App\Term::inRandomOrder()->first();
        },
    ];
});
