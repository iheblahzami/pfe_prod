<?php

namespace App\Controller;

use App\Entity\Income;
use App\Repository\IncomeRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/income")
 */
class IncomeController extends AbstractController
{
    /**
     * @Route("/", name="app_income_index", methods={"GET"})
     */
    public function index(IncomeRepository $incomeRepository): JsonResponse
    {
        $incomes = $incomeRepository->findAll();
        return $this->json($incomes, Response::HTTP_OK, [], ['groups' => 'income']);
    }

    /**
     * @Route("/new", name="app_income_new", methods={"POST"})
     */
    public function new(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $mois = $data['mois'] ?? null;
        $montantIncome = $data['montantIncome'] ?? null;

        if ($mois === null || $montantIncome === null) {
            return new JsonResponse(['error' => 'Missing required fields'], Response::HTTP_BAD_REQUEST);
        }

        $income = new Income();
        $income->setMois($mois);
        $income->setMontantIncome($montantIncome);

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($income);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Income created successfully'], Response::HTTP_CREATED);
    }

    /**
 * @Route("/{id}", name="app_income_show", methods={"GET"})
 */
public function show(int $id, IncomeRepository $incomeRepository): JsonResponse
{
    $income = $incomeRepository->find($id);

    if (!$income) {
        return new JsonResponse(['error' => 'Income not found'], Response::HTTP_NOT_FOUND);
    }

    return $this->json($income, Response::HTTP_OK, [], ['groups' => 'income']);
}


    /**
     * @Route("/{id}/edit", name="app_income_edit", methods={"PUT"})
     */
    public function edit(Request $request, Income $income): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $mois = $data['mois'] ?? null;
        $montantIncome = $data['montantIncome'] ?? null;

        if ($mois === null || $montantIncome === null) {
            return new JsonResponse(['error' => 'Missing required fields'], Response::HTTP_BAD_REQUEST);
        }

        $income->setMois($mois);
        $income->setMontantIncome($montantIncome);

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->flush();

        return new JsonResponse(['message' => 'Income updated successfully'], Response::HTTP_OK);
    }

    /**
     * @Route("/{id}", name="app_income_delete", methods={"DELETE"})
     */
    public function delete(Request $request, Income $income): JsonResponse
    {
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($income);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Income deleted successfully'], Response::HTTP_OK);
    }


    

}
