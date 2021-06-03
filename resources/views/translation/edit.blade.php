@extends('layouts.app')


@section('content')

    <section class="section">
        <div class="container">
            <form-config-component mode="TranslationEdit" :values="{{ $translation }}" readonly="false"></form-config-component>
        </div>
    </section>
@endsection
